document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn == "true") {
        document.querySelector("#newArticle").classList.remove("d-none")
        document.querySelector("#adminLogin").classList.add("d-none")
        document.querySelector("#logout").classList.remove("d-none")
    } else {
        document.querySelector("#newArticle").classList.add("d-none")
        document.querySelector("#adminLogin").classList.remove("d-none")
        document.querySelector("#logout").classList.add("d-none")
    }

    fetch("/all")
        .then(response => response.json())
        .then(data => {
            const articles = data.articles
            const main = document.querySelector("main")
            articles.map((article, index) => {
                const card = document.createElement("section")
                const picture = document.createElement("picture")
                picture.classList.add('picture')
                const img = document.createElement("img")
                img.src = article.image
                img.alt = `blog image ${index}`
                picture.appendChild(img)
                picture.onclick = event => handleBlogClick(article.slug, event)
                card.appendChild(picture)
                const div = document.createElement("div")
                const h2 = document.createElement("h2")
                h2.innerText = article.title
                div.appendChild(h2)
                const p = document.createElement('p')
                p.innerText = "This is my first blog"
                div.appendChild(p)
                const div2 = document.createElement("div")
                div2.classList.add("card-footer")
                const div3 = document.createElement("div")
                const date = new Date(article.createdAt)
                div3.innerHTML = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
                div2.appendChild(div3)
                const editLink = document.createElement("a")
                editLink.href = `/edit/${article.slug}`
                editLink.innerText = 'Edit'
                editLink.classList.add('edit-button')
                const deleteLink = document.createElement("a")
                deleteLink.href = `/delete/${article.slug}`
                deleteLink.innerText = 'Delete'
                deleteLink.classList.add('delete-button')
                div2.appendChild(editLink)
                div2.appendChild(deleteLink)
                div.appendChild(div2)
                card.appendChild(div)
                card.setAttribute("data-slug", article.slug)
                card.classList.add("card")
                // card.onclick = event => handleBlogClick(article.slug, event)
                // const a = document.createElement('a')
                // a.appendChild(card)
                // a.href = `/${article.slug}`
                main.appendChild(card)
            })
        });
})

const handleBlogClick = (slug, event) => {
    event.preventDefault()
    console.log(slug, event)
    let host = window.location.href
    let arr = host.split("/")
    let result = arr[0] + "//" + arr[2]
    window.location.replace(`${result}/article/${slug}`)
}