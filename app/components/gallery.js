"use client";
import Image from "next/image";
import { useState } from "react";
import { generateUploadButton } from "@uploadthing/react";

export default function Gallery({ images: initialImages = [] }) {
    const UploadButton = generateUploadButton({
        url: "/api/uploadthing",
    });
    
    const [images, setImages] = useState(initialImages);
    const [slideIndex, setSlideIndex] = useState(0);

    function plusSlides(n) {
        if (images.length === 0) return;
        
        let newIndex = slideIndex + n;
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        setSlideIndex(newIndex);
    }

    const handleUploadComplete = (res) => {
        const newImages = res.map(file => ({
            src: file.url,
            alt: file.name || "Uploaded image"
        }));
        
        setImages(prevImages => {
            const updatedImages = [...prevImages, ...newImages];
            setSlideIndex(updatedImages.length - 1);
            return updatedImages;
        });
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Main image container */}
            <div className="relative w-full h-96 bg-gray-50 flex items-center justify-center">
                {images.length > 0 ? (
                    <>
                        <Image
                            src={images[slideIndex].src}
                            alt={images[slideIndex].alt}
                            fill
                            style={{ objectFit: 'contain' }}
                            className="transition-opacity duration-300"
                        />
                        
                        {/* Navigation buttons - only show if more than 1 image */}
                        {images.length > 1 && (
                            <>
                                <button 
                                    onClick={() => plusSlides(-1)} 
                                    className="absolute top-1/2 left-4 z-10 flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 hover:bg-white transition-colors duration-200"
                                >
                                    <span className="text-xl font-bold text-gray-700">‹</span>
                                </button>
                                
                                <button 
                                    onClick={() => plusSlides(1)} 
                                    className="absolute top-1/2 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 hover:bg-white transition-colors duration-200"
                                >
                                    <span className="text-xl font-bold text-gray-700">›</span>
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="text-6xl mb-4">📷</div>
                        <p className="text-lg font-medium">No images yet</p>
                        <p className="text-sm">Upload your first image below</p>
                    </div>
                )}
            </div>
            
            {/* Slide indicators - only show if more than 1 image */}
            {images.length > 1 && (
                <div className="flex justify-center py-3 space-x-2 bg-gray-50">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSlideIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === slideIndex 
                                    ? 'bg-blue-500 w-6' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            )}
            
            {/* Upload section */}
            <div className="p-6 bg-gray-50 border-t">
                <div className="flex items-center justify-center">
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={handleUploadComplete}
                        onUploadError={(error) => {
                            console.error("Upload error:", error);
                            alert(`Upload failed: ${error.message}`);
                        }}
                        appearance={{
                            button: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                            allowedContent: "text-sm text-gray-600 mt-2"
                        }}
                    />
                </div>
                {images.length > 0 && (
                    <p className="text-center text-sm text-gray-500 mt-3">
                        {images.length} image{images.length > 1 ? 's' : ''} uploaded
                    </p>
                )}
            </div>
        </div>
    )
}