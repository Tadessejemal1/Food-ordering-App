import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}) {

  async function handleFileChange(ev) {
    const files = ev.target.files;
        if (files?.length > 0) {
            const data = new FormData();
            data.append('file', files[0]);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });

                if (response.status === 200) {
                    const responseData = await response.json();
                    toast.success('Image uploaded successfully!', {
                        className: 'bg-green-500 text-white rounded-lg px-4 py-2 shadow-lg whitespace-nowrap',
                        bodyClassName: 'text-sm',
                    });
                    setLink(responseData.link);
                } else {
                    const errorData = await response.json();
                    console.error(`Upload failed: ${errorData.error || 'Unknown error'}`);
                }
            } catch (err) {
                console.error(`Upload error: ${err.message}`);
            }
        }
  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}