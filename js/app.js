
document.addEventListener("DOMContentLoaded", () => {
    initPostcardPage();
    initSettingsButtonState();
});



function initPostcardPage() {
    const form = document.getElementById("postcard-form");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const isContactMode = params.get("mode") === "contact";

    const eyebrow = document.getElementById("postcard-eyebrow");
    const title = document.getElementById("postcard-title");
    const subtitle = document.getElementById("postcard-subtitle");
    const selectLabel = document.getElementById("select-label");
    const characterSelect = document.getElementById("character-select");
    const childNameInput = document.getElementById("child-name");
    const messageLabel = document.getElementById("message-label");
    const messageInput = document.getElementById("postcard-message");
    const submitBtn = document.getElementById("submit-btn");
    const stampImage = document.getElementById("stamp-image");
    const recipientPreview = document.getElementById("recipient-preview");
    const modal = document.getElementById("postcard-modal");
    const modalTitle = document.getElementById("modal-title");
    const successText = document.getElementById("success-text");
    const closeModalBtn = document.getElementById("close-modal");


    const storyData = {
        "capra-cu-trei-iezi": { name: "Capra și cei trei iezi", img: "../assets/img/3iezi.jpg" },
        "punguta-cu-doi-bani": { name: "Cocoșul din Punguța cu doi bani", img: "../assets/img/2bani.jpg" },
        "ursul-pacalit-de-vulpe": { name: "Ursul și Vulpea", img: "../assets/img/ursulvulpea.jpg" },
        praslea: { name: "Prâslea cel Voinic", img: "../assets/img/praslea.jpg" },
    };


    if (isContactMode) {
        document.title = "Tiny Tales | Contactează Biblioteca";
        eyebrow.textContent = "Părerea ta contează";
        title.textContent = "Scrie Bibliotecii Tiny Tales";
        subtitle.textContent = "Recomandă-ne cărți noi, propune modificări sau trimite-ne o sugestie pentru platformă.";
        selectLabel.textContent = "Despre ce vrei să ne scrii?";
        childNameInput.placeholder = "Ex: Maria / Prof. Popescu";
        messageLabel.textContent = "Mesajul tău pentru bibliotecă";
        messageInput.placeholder = "Scrie aici cartea pe care o recomanzi sau modificarea propusă...";
        submitBtn.innerHTML = 'Trimite scrisoarea <span aria-hidden="true">✉</span>';


        characterSelect.innerHTML = `
      <option value="Recomandare de carte">Recomandare de carte / poveste nouă</option>
      <option value="Propunere de modificare">Propunere de modificare / îmbunătățire</option>
      <option value="Problemă tehnică">Raportare problemă tehnică</option>
      <option value="Alte sugestii">Alte sugestii pentru bibliotecă</option>
    `;

        stampImage.src = "../assets/img/books.jpg";
        stampImage.alt = "Biblioteca Tiny Tales";
        recipientPreview.textContent = "Echipa Bibliotecii Tiny Tales";

        modalTitle.textContent = "Scrisoarea a ajuns la bibliotecă!";
        closeModalBtn.textContent = "Trimite altă sugestie";
    } else {

        characterSelect.addEventListener("change", () => {
            const selected = storyData[characterSelect.value];
            if (selected) {
                stampImage.src = selected.img;
                stampImage.alt = `Ilustrație ${selected.name}`;
                recipientPreview.textContent = selected.name;
            }
        });
    }


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const senderName = childNameInput.value.trim();

        if (isContactMode) {
            const topic = characterSelect.value;
            successText.textContent = `Mulțumim, ${senderName}! Mesajul tău (${topic}) a fost trimis către Biblioteca Tiny Tales.`;
        } else {
            const selected = storyData[characterSelect.value];
            successText.textContent = `Bravo, ${senderName}! Scrisoarea ta a ajuns cu bine la ${selected.name}.`;
        }

        modal.hidden = false;
    });

    closeModalBtn.addEventListener("click", () => {
        modal.hidden = true;
        form.reset();

        if (!isContactMode) {
            const defaultStory = storyData[characterSelect.value];
            stampImage.src = defaultStory.img;
            recipientPreview.textContent = defaultStory.name;
        }
    });
}

function initSettingsButtonState() {
    const formatSelect = document.getElementById("format");

    if (formatSelect) {
        formatSelect.addEventListener("change", () => {
            const mode = formatSelect.value;
            localStorage.setItem("tinyTalesMode", mode);
            updateSettingsState(mode);
        });
    }

    const savedMode = localStorage.getItem("tinyTalesMode");
    if (savedMode) {
        updateSettingsState(savedMode);
    }
}

function updateSettingsState(mode) {
    const volumeControls = document.querySelectorAll(".volume-control, #volume-up, #volume-down");
    const fontControls = document.querySelectorAll(".font-control, #font-family, #font-size");

    const isWrittenMode = mode === "scris";
    const isAudioMode = mode === "audio";

    volumeControls.forEach((control) => {
        control.disabled = isWrittenMode;
        control.classList.toggle("setting-disabled", isWrittenMode);
    });

    fontControls.forEach((control) => {
        control.disabled = isAudioMode;
        control.classList.toggle("setting-disabled", isAudioMode);
    });
}