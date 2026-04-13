import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

function App() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    kelas: "",
    jadwal: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateNama = () => {
    const nama = formData.nama.trim();
    if (!nama) return "Nama wajib diisi";
    if (nama.length < 3) return "Nama minimal 3 karakter";
    if (/\d/.test(nama)) return "Nama tidak boleh mengandung angka";
    return "";
  };

  const validateEmail = () => {
    const email = formData.email.trim();
    if (!email) return "Email wajib diisi";
    if (!email.includes("@")) return "Email harus mengandung @";
    if (!email.includes(".")) return "Email harus valid";
    return "";
  };

  const validateNoHp = () => {
    const noHp = formData.noHp.trim();
    if (!noHp) return "Nomor HP wajib diisi";
    if (!/^\d+$/.test(noHp)) return "Nomor HP hanya boleh angka";
    if (noHp.length < 10 || noHp.length > 13)
      return "Nomor HP harus 10-13 digit";
    return "";
  };

  const validateKelas = () => {
    if (!formData.kelas) return "Silakan pilih kelas";
    return "";
  };

  const validateJadwal = () => {
    if (!formData.jadwal) return "Silakan pilih jadwal";
    return "";
  };

  const errors = {
    nama: validateNama(),
    email: validateEmail(),
    noHp: validateNoHp(),
    kelas: validateKelas(),
    jadwal: validateJadwal(),
  };

  const isFormValid = Object.values(errors).every((error) => error === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-slate-900/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-2xl border border-slate-700">
        
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-2">
          Form Pendaftaran Kursus
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Isi data untuk mendaftar kelas pilihanmu 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Nama Lengkap"
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            error={errors.nama}
          />

          <InputField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            error={errors.email}
          />

          <InputField
            label="Nomor HP"
            type="text"
            name="noHp"
            value={formData.noHp}
            onChange={handleChange}
            placeholder="Masukkan nomor HP"
            error={errors.noHp}
          />

          <SelectField
            label="Pilih Kelas"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            options={[
              "Kelas Programming",
              "Kelas UI/UX",
              "Kelas Web Development",
              "Kelas Mobile Development",
            ]}
            error={errors.kelas}
          />

          <SelectField
            label="Pilih Jadwal"
            name="jadwal"
            value={formData.jadwal}
            onChange={handleChange}
            options={["Senin", "Rabu", "Jumat", "Sabtu"]}
            error={errors.jadwal}
          />

          {isFormValid && (
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              Submit Pendaftaran
            </button>
          )}
        </form>

        {submittedData && (
          <div className="mt-8 bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Pendaftaran Berhasil ✅
            </h2>
            <div className="space-y-2 text-slate-300">
              <p><strong>Nama:</strong> {submittedData.nama}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>No HP:</strong> {submittedData.noHp}</p>
              <p><strong>Kelas:</strong> {submittedData.kelas}</p>
              <p><strong>Jadwal:</strong> {submittedData.jadwal}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;