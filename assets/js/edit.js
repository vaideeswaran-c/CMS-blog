document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn == "true") {
        document.querySelector("#adminLogin").classList.add("d-none")
        document.querySelector("#logout").classList.remove("d-none")
    } else {
        document.querySelector("#adminLogin").classList.remove("d-none")
        document.querySelector("#logout").classList.add("d-none")
    }

    let result = window.location.pathname.split('/').slice(0, 3)[2]
    console.log(result)

    fetch(`/editblog/${result}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.article, data.article._id)
            const title = data.article.title
            const description = data.article.description
            console.log(title)
            console.log(description)
            document.querySelector('#id').value = data.article._id
            document.querySelector('#title').value = title
            document.querySelector('#description').innerHTML = description
        })


})


const handleEdit = event => {
    event.preventDefault()
    console.log("handleEdit")
    console.log(tinymce.get("description").getContent())
    const id = document.querySelector("#id").value;
    const title = document.querySelector("#title").value;
    const image = imagePreviewUrl
    const description = tinymce.get("description").getContent()
    const body = {
        id, title, image, description
    }
    console.log(body)
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/update`)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let host = window.location.href
            let arr = host.split("/");
            let result = arr[0] + "//" + arr[2]
            window.location.replace(result);
        });
}