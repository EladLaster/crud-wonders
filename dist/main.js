const wondersContainer = document.getElementById("wonders");
const newWonderInput = document.getElementById("new-wonder-input");
const newLocationInput = document.getElementById("new-location-input");
const templateSource = document.getElementById("wonders-template").innerHTML;
const template = Handlebars.compile(templateSource);

const render = (wonders) => {
    wondersContainer.innerHTML = template({ wonders });
}

const fetchWonders = () => {
    fetch("/wonders")
        .then(res => res.json())
        .then(render);
}

const addWonder = () => {
    const data = { 
        name: newWonderInput.value.trim(), 
        location: newLocationInput.value.trim() 
    };
    if(!data.name || !data.location) return;

    fetch("/wonder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        newWonderInput.value = "";
        newLocationInput.value = "";
        render(res.wonders);
    });
}

const updateVisited = (fullText) => {
    const name = fullText.split(" - ")[0].trim(); // רק שם ה-wonder
    fetch(`/wonder/${encodeURIComponent(name)}`, { method: "PUT" })
        .then(res => res.json())
        .then(res => render(res.wonders));
}

const deleteWonder = (fullText) => {
    const name = fullText.split(" - ")[0].trim(); // רק שם ה-wonder
    fetch(`/wonder/${encodeURIComponent(name)}`, { method: "DELETE" })
        .then(res => res.json())
        .then(res => render(res.wonders));
}

wondersContainer.addEventListener("click", (e) => {
    const wonderEl = e.target.closest(".wonder");
    if(!wonderEl) return;

    const fullText = wonderEl.querySelector(".name").textContent.trim();

    if(e.target.classList.contains("visit")) {
        updateVisited(fullText);
    } else if(e.target.classList.contains("delete")) {
        deleteWonder(fullText);
    }
});

document.querySelector("button").addEventListener("click", addWonder);

fetchWonders();
