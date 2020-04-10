(function() {
    const photosListButton = document.querySelector("#photo_list");
    const addPhotoButton = document.querySelector("#add_photo");
    const camerasListButton = document.querySelector("#camera_list");
    const addCameraButton = document.querySelector("#add_camera");
    const closeDrawerButton = document.querySelector("#close_drawer");
    const openDrawerButton = document.querySelector("#open_drawer");
    const otherAppsButton = document.querySelector("#other_apps");
    // const photoList = document.querySelector(".photo_list");
    // const searchBar = document.querySelector(".search_bar");
    const header = document.querySelector(".header");
    const content = document.querySelector(".content");

    const drawer = document.querySelector(".sidebar");

    photosListButton.addEventListener('click', event => {
        window.location = '/photos';
    });

    addPhotoButton.addEventListener('click', event => {
        window.location = '/photo/new';
    });

    camerasListButton.addEventListener('click', event => {
        window.location = '/cameras';
    });

    addCameraButton.addEventListener('click', event => {
        window.location = '/camera/new';
    });

    otherAppsButton.addEventListener('click', event => {
        window.location = '/other-apps';
    });

    var isOpen = 0;
    closeDrawerButton.addEventListener('click', event => {
        
        drawer.style.left = String(-1 * drawer.offsetWidth) + 'px' ;
        
        if (content != null && header != null) {
            content.style.marginLeft = '30pt';
            header.style.marginLeft = '30pt';
            header.firstElementChild.style.marginLeft = '40pt';
        }

        isOpen = -1;
    });
    
    openDrawerButton.addEventListener('click', event => {
        drawer.style.left = '0px' ;

        if (content != null && header != null && window.innerWidth >= 600) {
            content.style.marginLeft = '300pt';
            header.style.marginLeft = '300pt';
            header.firstElementChild.style.marginLeft = '0pt';
        }

        isOpen = 1;
    });

    window.addEventListener('resize', event => {
        console.log('lol')
        closeDrawerButton.click();
    });

})();