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

    fetch(`/blog/${result}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const title = data.article.title
            const image = data.article.image
            const description = data.article.description
            document.querySelector('.newh1').innerText = title
            const img = document.createElement('img')
            img.src = image
            img.classList.add('blog-image')
            img.setAttribute("alt", " blog image")
            document.querySelector('picture').appendChild(img)
            document.querySelector('#description').innerHTML = description
        })
})