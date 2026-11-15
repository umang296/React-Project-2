import { supabase } from "./supabaseClient";

function UploadFile() {
    async function upload(uploadFile) {
        let filePath = uploadFile.name;
        const { data, error } = await supabase.storage.from('Images').upload(filePath, uploadFile, {
            cacheControl: '3600',
            upsert: true
        });

        if (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed.');
            return;
        } else {
            const { data, link } = supabase.storage.from("Images").getPublicUrl(filePath);
            alert("File uploaded successfully! Link: " + link.publicUrl);
            console.log("Public URL:", link.publicUrl);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const uploadFile = event.target.fileInput.files[0];

        if (!uploadFile) {
            alert('Please select a file to upload.');
            return;
        }

        upload(uploadFile);
        event.target.reset();
    };

    return (
        <div>
            <p>Upload File to Supabase Storage</p>
            <form onSubmit={handleSubmit}>
                <input type="file" name="fileInput" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadFile;