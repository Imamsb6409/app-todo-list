// ... (Bagian 'Memilih elemen HTML' tetap sama) ...
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Cek apakah ada data di localStorage, jika tidak, mulai dengan array kosong
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Fungsi untuk menyimpan data ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ... (Fungsi renderTodos() tetap sama) ...

// 3. Fungsi untuk menampilkan (render) semua todo
function renderTodos() {
  // Kosongkan dulu list-nya agar tidak ada duplikat
  todoList.innerHTML = "";

  // Loop setiap item di array 'todos'
  todos.forEach((todo) => {
    // Buat elemen <li> baru untuk setiap todo
    const li = document.createElement("li");
    li.className = "todo-item";

    // Isi konten HTML untuk item todo
    li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="edit-btn" data-id="${todo.id}">Edit</button>
                <button class="delete-btn" data-id="${todo.id}">Hapus</button>
            </div>
        `;

    // Tambahkan elemen <li> yang sudah jadi ke dalam <ul>
    todoList.appendChild(li);
  });
}

// Panggil fungsi renderTodos agar daftar tugas langsung tampil saat halaman dimuat
renderTodos();

// Event listener untuk tombol 'Tambah'
addBtn.addEventListener("click", function () {
  // 1. Ambil teks dari kotak input
  const newTodoText = todoInput.value.trim();

  // 2. Pastikan input tidak kosong
  if (newTodoText !== "") {
    // 3. Buat objek todo baru
    const newTodo = {
      id: Date.now(), // Gunakan timestamp sebagai ID unik
      text: newTodoText,
    };

    // 4. Tambahkan todo baru ke dalam array 'todos'
    todos.push(newTodo);
    saveTodos(); // <-- TAMBAHKAN INI

    // 5. Kosongkan kembali input field
    todoInput.value = "";

    // 6. Tampilkan ulang daftar tugas
    renderTodos();
  }
});

// Event listener untuk tombol di dalam list (Edit & Hapus)
todoList.addEventListener("click", function (event) {
  const target = event.target; // Element yang di-klik

  // --- LOGIKA HAPUS (DELETE) ---
  if (target.classList.contains("delete-btn")) {
    // Ambil ID dari atribut data-id
    const idToDelete = parseInt(target.getAttribute("data-id"));

    // Buat array baru yang isinya semua todo KECUALI yang ID-nya mau dihapus
    todos = todos.filter((todo) => todo.id !== idToDelete);
    saveTodos(); // <-- TAMBAHKAN INI

    // Tampilkan ulang daftar tugas
    renderTodos();
  }

  // --- LOGIKA EDIT (UPDATE) ---
  if (target.classList.contains("edit-btn")) {
    // Ambil ID dari atribut data-id
    const idToEdit = parseInt(target.getAttribute("data-id"));

    // Arahkan pengguna ke halaman edit.html dengan membawa ID di URL
    window.location.href = `edit.html?id=${idToEdit}`;
  }
});
