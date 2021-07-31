const handleLogin = event => {
    event.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    console.log("email", email, password)
    if (!email || email == "") {
        document.querySelector("#emailError").innerText = "Email cannot be empty"
        return
    } else {
        document.querySelector("#emailError").innerText = ""
    }
    if (!password || password == "") {
        document.querySelector("#passwordError").innerText = "Password cannot be empty"
        return
    } else {
        document.querySelector("#passwordError").innerText = ""
    }
    const params = { email, password }
    console.log(params)
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/register`)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url)
    const options = {
        method: 'GET'
    };
    // fetch(url, options)
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                document.querySelector("#error").innerText = data.error
            } else {
                let host = window.location.href
                let arr = host.split("/");
                let result = arr[0] + "//" + arr[2]
                sessionStorage.setItem("isLoggedIn", true)
                window.location.replace(result);
            }
        });
}

const handleLogout = event => {
    event.preventDefault()
    sessionStorage.removeItem("isLoggedIn")
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    window.location.replace(result);
}

let imagePreviewUrl;

const handleImageSelect = event => {
    event.preventDefault()
    console.log("test")
    const reader = new FileReader();
    const file = event.target.files[0];
    if (file.size > 2097152) {
        setTimeout(() => alert("Image size cannot be greater than 10MB"), 700);
        return;
    }
    if (!"image/jpg,image/jpeg,image/png".includes(file.type)) {
        setTimeout(() => alert("Only image file types are allowed"), 700);
        return;
    }
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = upload => {
            imagePreviewUrl = upload.target.result
        }
    }
}

const handleSave = event => {
    event.preventDefault()
    console.log("handlesave")
    console.log(tinymce.get("description").getContent())
    const title = document.querySelector("#title").value;
    const image = imagePreviewUrl
    const description = tinymce.get("description").getContent()
    const body = {
        title, image, description
    }
    console.log(body)
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/upload`)
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