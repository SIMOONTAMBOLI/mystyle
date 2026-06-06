import ImageGallery from '../LandingPage/home/ImageGallery';

function GalleryPage() {

    return (

        <div>

            <ImageGallery
                title="Person Uploads"
                type="person"
            />



            <ImageGallery
                title="Outfit Uploads"
                type="outfit"
            />

        </div>

    );

}

export default GalleryPage;