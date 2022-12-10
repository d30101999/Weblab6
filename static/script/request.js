
window.addEventListener('load', () => {
    let id = 1;
    const preloader = document.getElementById("preloader");
    const posts = document.getElementById("posts");
    const button = document.getElementById("add-post");
    button.addEventListener('click', async function (e) {
        button.disabled = true;
        const post_t = document.getElementById("one-post");
        const post = post_t.content.cloneNode(true);
        const post_title = post.querySelector("h3");
        const post_body = post.getElementById("post-body");
        preloader.classList.remove('disabled');
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
            if (response.ok) {
                let json = await response.json();
                console.log(json);
                if (Object.keys(json).length) {
                    post_title.innerHTML = json.title;
                    post_body.setAttribute('id', id);
                    post_body.innerHTML = json.body;
                    id = id + 1;
                } else {
                    alert("⚠ Something went wrong!");
                }
                preloader.classList.add('disabled');
                posts.insertBefore(post, preloader);
            } else {
                alert("⚠ Something went wrong!");
            }
            button.disabled = false;
        } catch (error) {
            alert("⚠ Something went wrong!");
            preloader.classList.add('disabled');
            button.disabled = false;
        }
    });
})


window.addEventListener("load", async function loadUrl() {
    const container = document.getElementById('photos');
    let gallery = []

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/photos')
        gallery = await response.json();
        let counter = 0
        gallery = gallery.filter(function (item, index, array) {
            return (counter++ < 20 && 1 == Math.round(Math.random()));
        });
    } catch (e) {
        const message = document.createElement("p")
        message.innerHTML = "⚠ Something went wrong!"
        message.classList.add("error_message")
        container.appendChild(message)
        return
    } finally {

        document.getElementsByClassName("preloader")[0].style.display = "none"
    }
    gallery.forEach(function (gal, i, gallery) {
        const articlePhoto = document.createElement("article");
        const title = document.createElement("div");

        const titleName = document.createElement("h3");
        titleName.innerHTML = gal.title;
        const thumbnailUrl = document.createElement("img");
        thumbnailUrl.src =  gal.thumbnailUrl;

        articlePhoto.classList.add("photo_with_title")
        title.classList.add("title_in_album")

        titleName.classList.add("title_name_in_album")
        thumbnailUrl.classList.add("thumbnailUrl_of_photo")


        title.appendChild(thumbnailUrl)
        title.appendChild(titleName)
        articlePhoto.appendChild(title)
        container.appendChild(articlePhoto)
    });
})
