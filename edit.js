// 1. Pilih elemen HTML di halaman edit.html
const editInput = document.getElementById("edit-input");
const saveBtn = document.getElementById("save-btn");

// 2. Ambil ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const todoId = parseInt(urlParams.get("id")); // Ambil nilai dari parameter 'id'

// 3. Ambil semua todos dari localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 4. Cari todo yang mau diedit dan tampilkan di input
const todoToEdit = todos.find((todo) => todo.id === todoId);

if (todoToEdit) {
  // Jika todo ditemukan, isi input dengan teksnya
  editInput.value = todoToEdit.text;
} else {
  // Jika tidak ditemukan (misal, URL diubah manual), kembalikan ke halaman utama
  alert("Tugas tidak ditemukan!");
  window.location.href = "index.html";
}

// 5. Tambahkan event listener untuk tombol Simpan
saveBtn.addEventListener("click", function () {
  // Ambil teks baru dari input
  const newText = editInput.value.trim();

  if (newText !== "") {
    // Update teks pada todo yang sedang diedit
    todoToEdit.text = newText;

    // Simpan kembali seluruh array todos ke localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Arahkan kembali ke halaman utama
    alert("Tugas berhasil diperbarui!");
    window.location.href = "index.html";
  }
});
