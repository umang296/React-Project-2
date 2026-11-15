import { useState, useEffect } from "react";
import { supabase } from "./include/supabaseClient";

const BUCKET = "Images";
const IMAGE_REGEX = /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i;

function UploadFile() {
    const [previewUrl, setPreviewUrl] = useState(null); // Exercise 1
    const [images, setImages] = useState([]);           // Exercise 2

    // ---------- Exercise 2: load all images in the bucket ----------
    async function loadImages() {
        const { data, error } = await supabase.storage.from(BUCKET).list("", {
            limit: 100,
            sortBy: { column: "created_at", order: "desc" },
        });
        if (error) {
            console.error("Error listing images:", error);
            return;
        }
        const urls = data
            .filter((f) => IMAGE_REGEX.test(f.name))
            .map((f) => ({
                name: f.name,
                url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
            }));
        setImages(urls);
    }

    useEffect(() => {
        loadImages();
    }, []);

    // ---------- Exercise 1: preview before upload ----------
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (previewUrl) URL.revokeObjectURL(previewUrl); // free the old preview
        if (file && file.type.startsWith("image/")) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    // ---------- Upload ----------
    async function upload(uploadFile) {
        const filePath = uploadFile.name;
        const { error } = await supabase.storage.from(BUCKET).upload(filePath, uploadFile, {
            cacheControl: "3600",
            upsert: true,
        });

        if (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed.");
            return;
        }

        // getPublicUrl returns { data: { publicUrl } }
        const { data: link } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        alert("File uploaded successfully! Link: " + link.publicUrl);
        console.log("Public URL:", link.publicUrl);
        loadImages(); // refresh the gallery
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target; // keep a reference, we use it after "await"
        const uploadFile = form.fileInput.files[0];

        if (!uploadFile) {
            alert("Please select a file to upload.");
            return;
        }

        await upload(uploadFile);
        form.reset();
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    return (
        <div>
            <p>Upload File to Supabase Storage</p>
            <form onSubmit={handleSubmit}>
                <input type="file" name="fileInput" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            {previewUrl && (
                <div className="mt-3">
                    <h5>Preview</h5>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: "300px", maxHeight: "300px" }} />
                </div>
            )}

            <h5 className="mt-4">Display all images in storage</h5>
            <div className="d-flex flex-wrap gap-3">
                {images.length === 0 && <p>No images yet.</p>}
                {images.map((img) => (
                    <img
                        key={img.name}
                        src={img.url}
                        alt={img.name}
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                ))}
            </div>
        </div>
    );
}

export default UploadFile;