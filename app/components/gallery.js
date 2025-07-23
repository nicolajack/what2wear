"use client";
import Image from "next/image";
import { useState } from "react";
import { generateUploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

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
        <div className="flex items-center justify-center gap-6 w-full max-w-4xl mx-auto">
            <button
                onClick={() => plusSlides(-1)}
                className="bg-white hover:bg-gray-300 flex items-center justify-center w-12 h-12 text-3xl font-bold text-gray-600 hover:text-black transition-colors duration-200"
                disabled={images.length === 0}
            >
                &lt;
            </button>
            
            <div className="relative w-64 h-64 rounded-lg flex items-center justify-center">
                <Image
                        src={images[slideIndex].src}
                        alt={images[slideIndex].alt}
                        fill 
                        style={{ objectFit: 'contain' }}
                        className="transition-opacity duration-300 rounded-lg"
                />
            </div>

            <button 
                onClick={() => plusSlides(1)} 
                className="bg-white hover:bg-gray-300 flex items-center justify-center w-12 h-12 text-3xl font-bold text-gray-600 hover:text-black transition-colors duration-200"
                disabled={images.length === 0}
            >
                &gt;
            </button>

            <div className="ml-4">
                <UploadButton 
                    className="ut-button:bg-blue-500 ut-button:hover:bg-blue-600 ut-button:text-white ut-button:font-bold ut-button:text-2xl ut-button:w-12 ut-button:h-12 ut-button:rounded-full ut-button:transition-colors ut-button:duration-200"
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={(error) => {
                        console.error("Upload error:", error);
                        alert(`Upload failed: ${error.message}`);
                    }}
                    content={{
                        button: "+"
                    }}
                />
            </div>
        </div>
    )
}
