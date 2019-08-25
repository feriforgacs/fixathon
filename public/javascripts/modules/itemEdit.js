import { $ } from './bling';

export function itemPhotoPreview(event){
  const itemPhotoLabel = $("#itemPhoto__label");
  const previewContainer = $("#itemPhoto__preview");
  const previewImage = $("#itemPhoto__preview img");
  const itemPhoto = $("#itemPhoto");

  itemPhotoLabel.innerHTML = '<span aria-label="Framed Picture">🖼️ </span>Select another image... ';

  if (event.target.files[0].size > 1048576) {
		itemPhoto.value = "";
		alert("The selected file is bigger than 1MB. Please, choose another one.");
		return;
  }
  
  previewImage.src = URL.createObjectURL(event.target.files[0]);
  previewContainer.classList.remove("hidden");
}

export function charCounter(maxChars, inputField, charCounter){
  const valueLength = inputField.value.length;
  const remaining = maxChars - valueLength;
  charCounter.innerHTML = `${remaining} chars remaining`;
}