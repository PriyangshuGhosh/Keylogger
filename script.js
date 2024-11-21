// Function to save string to Firestore
async function saveStringToFirestore(string) {
  try {
    // Add the string to Firestore collection "strings"
    const docRef = await addDoc(collection(db, "strings"), {
      text: string
    });
    console.log("Document written with ID: ", docRef.id);
    displayStrings(); // Refresh the displayed strings
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to display strings from Firestore
async function displayStrings() {
  const querySnapshot = await getDocs(collection(db, "strings"));
  const displayDiv = document.getElementById("displayStrings");
  displayDiv.innerHTML = "";  // Clear the display area

  querySnapshot.forEach((doc) => {
    const div = document.createElement("div");
    div.textContent = doc.data().text;  // Display the string
    displayDiv.appendChild(div);
  });
}

// Add event listener to submit form
document.getElementById("submitForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from reloading the page
  const userString = document.getElementById("userString").value;
  if (userString.trim() !== "") {
    saveStringToFirestore(userString); // Save the string
    document.getElementById("userString").value = ""; // Clear input field
  }
});

// Call displayStrings to show data when page loads
displayStrings();
