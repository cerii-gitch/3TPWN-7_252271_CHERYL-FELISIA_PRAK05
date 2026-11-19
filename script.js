
// =====================================
// 1. AMBIL ELEMEN YANG DIBUTUHKAN
// =====================================

const isiTabel = document.getElementById("isiTabel");
const inputCari = document.getElementById("cari");
const totalBuku = document.getElementById("totalBuku");
const terpilih = document.getElementById("terpilih");

const inputJudul = document.getElementById("judul");
const inputPenulis = document.getElementById("penulis");
const inputTahun = document.getElementById("tahun");
const inputStok = document.getElementById("stok");

const formBuku = document.getElementById("formBuku");
const tombolTambah = document.getElementById("tombolTambah");
const tombolMenipis = document.getElementById("tombolMenipis");
const hapusTerpilih = document.getElementById("hapusTerpilih");

const kotakError = document.getElementById("pesanError");
const pesanSukses = document.getElementById("pesanSukses");


// =====================================
// 2. HITUNG TOTAL BUKU
// =====================================

function perbaruiTotal() {

    const semuaBaris = isiTabel.querySelectorAll("tr");

    let jumlah = 0;

    for (let i = 0; i < semuaBaris.length; i++) {

        if (!semuaBaris[i].hidden) {
            jumlah++;
        }

    }

    totalBuku.textContent = "Total judul: " + jumlah;
}

perbaruiTotal();


// =====================================
// 3. PENCARIAN JUDUL DAN PENULIS
// =====================================

inputCari.addEventListener("input", function () {

    const kata = inputCari.value.trim().toLowerCase();

    const semuaBaris = isiTabel.querySelectorAll("tr");

    for (let i = 0; i < semuaBaris.length; i++) {

        const judul = semuaBaris[i].cells[0]
            .textContent.toLowerCase();

        const penulis = semuaBaris[i].cells[1]
            .textContent.toLowerCase();

        const cocok =
            judul.includes(kata) ||
            penulis.includes(kata);

        semuaBaris[i].hidden = !cocok;

    }

    perbaruiTotal();

});


// =====================================
// 4. PILIH DAN SOROT BARIS
// =====================================

isiTabel.addEventListener("click", function (event) {

    const baris = event.target.closest("tr");

    if (baris === null) {
        return;
    }

    const aktif = baris.classList.toggle("dipilih");

    if (aktif) {

        terpilih.textContent =
            "Dipilih: " + baris.cells[0].textContent;

    } else {

        terpilih.textContent = "Dipilih: -";

    }

});


// =====================================
// 5. SOROT STOK MENIPIS
// =====================================

tombolMenipis.addEventListener("click", function () {

    const semuaBaris = isiTabel.querySelectorAll("tr");

    for (let i = 0; i < semuaBaris.length; i++) {

        const stok = Number(semuaBaris[i].cells[4].textContent);

        semuaBaris[i].classList.toggle("menipis", stok <= 3);

    }

});


// =====================================
// 6. HAPUS BARIS TERPILIH
// =====================================

hapusTerpilih.addEventListener("click", function () {

    const barisDipilih = isiTabel.querySelectorAll("tr.dipilih");

    if (barisDipilih.length === 0) {

        terpilih.textContent = "Tidak ada baris yang dipilih.";

        return;
    }

    barisDipilih.forEach(function (baris) {

        baris.remove();

    });

    terpilih.textContent = "Dipilih: -";

    perbaruiTotal();

});


// =====================================
// 7. BUAT BARIS TABEL BARU
// =====================================

function buatBaris(data) {

    const baris = document.createElement("tr");

    for (let i = 0; i < data.length; i++) {

        const kolom = document.createElement("td");

        kolom.textContent = data[i];

        baris.appendChild(kolom);

    }

    return baris;

}


// =====================================
// 8. CEK JUDUL DAN DUPLIKAT
// =====================================

function judulSudahAda(nilai) {

    const semuaBaris = isiTabel.querySelectorAll("tr");

    for (let i = 0; i < semuaBaris.length; i++) {

        const judul = semuaBaris[i].cells[0].textContent;

        if (judul.toLowerCase() === nilai.toLowerCase()) {

            return true;

        }

    }

    return false;

}


function cekJudul(nilai) {

    if (nilai === "") {
        return "Judul wajib diisi.";
    }

    if (nilai.length < 3) {
        return "Judul minimal 3 karakter.";
    }

    if (judulSudahAda(nilai)) {
        return "Judul sudah ada di katalog.";
    }

    return "";

}


// =====================================
// 9. CEK PENULIS
// =====================================

function cekPenulis(nilai) {

    if (nilai === "") {
        return "Penulis wajib diisi.";
    }

    if (nilai.length < 3) {
        return "Penulis minimal 3 karakter.";
    }

    // Periksa setiap karakter penulis
    // Nama penulis tidak boleh mengandung angka

    for (let i = 0; i < nilai.length; i++) {

        if (!isNaN(nilai[i])) {

            return "Nama penulis tidak boleh mengandung angka.";

        }

    }

    return "";

}


// =====================================
// 10. CEK TAHUN
// =====================================

function cekTahun(nilai) {

    if (nilai === "") {
        return "Tahun wajib diisi.";
    }

    const angka = Number(nilai);

    const tahunIni = new Date().getFullYear();

    if (!Number.isInteger(angka)) {

        return "Tahun harus berupa angka bulat.";

    }

    if (angka < 1900 || angka > tahunIni) {

        return "Tahun harus antara 1900 dan " + tahunIni + ".";

    }

    return "";

}


// =====================================
// 11. CEK STOK
// =====================================

function cekStok(nilai) {

    if (nilai === "") {
        return "Stok wajib diisi.";
    }

    const angka = Number(nilai);

    if (!Number.isInteger(angka)) {

        return "Stok harus berupa angka bulat.";

    }

    if (angka < 0) {

        return "Stok tidak boleh negatif.";

    }

    return "";

}


// =====================================
// 12. VALIDASI SEMUA KOLOM DENGAN LOOP
// =====================================

function validasiForm() {

    const kolom = [

        {
            input: inputJudul,
            cek: cekJudul
        },

        {
            input: inputPenulis,
            cek: cekPenulis
        },

        {
            input: inputTahun,
            cek: cekTahun
        },

        {
            input: inputStok,
            cek: cekStok
        }

    ];

    const daftarError = [];

    for (let i = 0; i < kolom.length; i++) {

        const nilai = kolom[i].input.value.trim();

        const pesan = kolom[i].cek(nilai);

        kolom[i].input.classList.toggle(
            "salah",
            pesan !== ""
        );

        if (pesan !== "") {

            daftarError.push(pesan);

        }

    }

    return daftarError;

}


// =====================================
// 13. TAMPILKAN PESAN ERROR
// =====================================

function tampilkanError(daftarError) {

    kotakError.innerHTML = "";

    daftarError.forEach(function (pesan) {

        const item = document.createElement("li");

        item.textContent = pesan;

        kotakError.appendChild(item);

    });

}


// =====================================
// 14. HITUNG PERCOBAAN GAGAL
// =====================================

let percobaanGagal = 0;


// =====================================
// 15. PROSES TAMBAH BUKU
// =====================================

formBuku.addEventListener("submit", function (event) {

    event.preventDefault();

    pesanSukses.textContent = "";

    const daftarError = validasiForm();

    tampilkanError(daftarError);

    // Jika masih ada kesalahan

    if (daftarError.length > 0) {

        percobaanGagal++;

        if (percobaanGagal >= 3) {

            tombolTambah.disabled = true;

            kotakError.innerHTML = "";

            const item = document.createElement("li");

            item.textContent =
                "Tombol Tambah dinonaktifkan karena 3 kali gagal berturut-turut. Refresh halaman untuk mencoba lagi.";

            kotakError.appendChild(item);

        }

        return;

    }


    // Jika semua data benar

    const data = [

        inputJudul.value.trim(),

        inputPenulis.value.trim(),

        document.getElementById("kategori").value,

        inputTahun.value.trim(),

        inputStok.value.trim()

    ];

    isiTabel.appendChild(buatBaris(data));

    // Reset percobaan gagal

    percobaanGagal = 0;

    // Kosongkan form

    formBuku.reset();

    // Hilangkan tanda salah

    const semuaInput = formBuku.querySelectorAll("input");

    semuaInput.forEach(function (input) {

        input.classList.remove("salah");

    });

    // Tampilkan pesan sukses

    kotakError.innerHTML = "";

    pesanSukses.textContent =
        "Buku ditambahkan: " + data[0];

    perbaruiTotal();

});
