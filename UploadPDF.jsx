function UploadPDF() {
    return (
        <>
            <div className="w-[80%] pt-[100px] pb-[100px] mx-[auto] border-2 border-dashed justify-items-center align-middle">
                <div className="w-[300px] mx-[50%] text-lg  text-center">Drag and Drop the file here</div>
                <div className="w-[] mx-[50%]">or</div>
                <div className="flex flex-col items-center space-y-2">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Upload File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => console.log(e.target.files[0])}
                    />
                    <p className="text-gray-500 text-sm">No file chosen</p>
                </div>
            </div>
        </>
    )
}
export default UploadPDF;