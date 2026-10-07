import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {Search, Settings, Play, Star, X, Lock, Plus, Pencil, Trash2, Save, LogOut} from "lucide-react";
import "./style.css";

const seedMovies=[
{id:1,title:"The Last Horizon",year:2026,genre:"Action",rating:8.7,poster:"https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80",desc:"Sebuah perjalanan terakhir menuju dunia yang perlahan kehilangan harapan."},
{id:2,title:"Midnight City",year:2025,genre:"Crime",rating:8.3,poster:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80",desc:"Malam panjang, rahasia besar, dan satu keputusan yang mengubah segalanya."},
{id:3,title:"Beyond The Stars",year:2026,genre:"Sci-Fi",rating:9.1,poster:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=700&q=80",desc:"Petualangan menuju tempat yang belum pernah disentuh manusia."},
{id:4,title:"Shadow House",year:2024,genre:"Horror",rating:8.1,poster:"https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&w=700&q=80",desc:"Rumah tua itu kosong selama bertahun-tahun. Setidaknya, begitu kata mereka."},
{id:5,title:"Ocean Memories",year:2025,genre:"Drama",rating:8.5,poster:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",desc:"Sebuah kisah tentang keluarga, kehilangan, dan pulang."},
{id:6,title:"Velocity",year:2026,genre:"Action",rating:8.8,poster:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",desc:"Kecepatan adalah satu-satunya jalan untuk menyelamatkan mereka."}
];
const empty={id:null,title:"",year:new Date().getFullYear(),genre:"Action",rating:8,poster:"",desc:""};

function App(){
 const [movies,setMovies]=useState(()=>JSON.parse(localStorage.getItem("m3_movies")||"null")||seedMovies);
 const [brand,setBrand]=useState(()=>JSON.parse(localStorage.getItem("m3_brand")||"null")||{name:"Mutations Three Cinema",tagline:"PRIVATE CINEMA",pin:"1234"});
 const [query,setQuery]=useState("");
 const [selected,setSelected]=useState(null);
 const [settings,setSettings]=useState(false);
 const [admin,setAdmin]=useState(false);
 const [pin,setPin]=useState("");
 const [tab,setTab]=useState("movies");
 const [form,setForm]=useState(empty);

 useEffect(()=>localStorage.setItem("m3_movies",JSON.stringify(movies)),[movies]);
 useEffect(()=>{localStorage.setItem("m3_brand",JSON.stringify(brand));document.title=brand.name},[brand]);
 const filtered=movies.filter(m=>`${m.title} ${m.genre}`.toLowerCase().includes(query.toLowerCase()));
 const login=()=>{if(pin===brand.pin){setAdmin(true);setPin("")}else alert("PIN salah.")};
 const edit=(m)=>setForm(m);
 const saveMovie=()=>{
   if(!form.title.trim()) return alert("Judul film wajib diisi.");
   if(form.id) setMovies(ms=>ms.map(m=>m.id===form.id?{...form,id:Number(form.id)}:m));
   else setMovies(ms=>[{...form,id:Date.now(),year:Number(form.year),rating:Number(form.rating)},...ms]);
   setForm(empty);
 };
 const del=(id)=>{if(confirm("Hapus film ini?"))setMovies(ms=>ms.filter(m=>m.id!==id))};

 return <div className="app">
 <header className="nav"><div className="brand" onClick={()=>scrollTo(0,0)}><div className="logo">M3</div><div><b>{brand.name}</b><span>{brand.tagline}</span></div></div>
 <nav><a>Beranda</a><a>Film</a><a>Genre</a></nav>
 <div className="nav-actions"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari film..."/></div><button className="iconbtn" onClick={()=>setSettings(true)}><Settings size={19}/></button></div></header>

 <main><section className="hero"><div className="hero-copy"><div className="eyebrow">WELCOME TO YOUR PRIVATE CINEMA</div><h1>Watch something<br/><em>extraordinary.</em></h1><p>Koleksi film pribadi dengan pengalaman menonton yang nyaman, elegan, dan sederhana.</p><button className="primary" onClick={()=>setSelected(movies[0])}><Play size={18} fill="currentColor"/> Mulai Menonton</button></div>
 <div className="hero-poster"><img src={movies[2]?.poster||movies[0]?.poster}/><div className="hero-card"><span>FEATURED</span><b>{movies[2]?.title||movies[0]?.title}</b><small>★ {movies[2]?.rating||movies[0]?.rating} · {movies[2]?.year||movies[0]?.year}</small></div></div></section>
 <section className="section"><div className="section-head"><div><span className="eyebrow">YOUR COLLECTION</span><h2>Film Pilihan</h2></div></div><div className="grid">{filtered.map(m=><article className="movie" key={m.id} onClick={()=>setSelected(m)}><div className="poster"><img src={m.poster}/><div className="play"><Play size={20} fill="white"/></div><span className="rating">★ {m.rating}</span></div><h3>{m.title}</h3><p>{m.year} · {m.genre}</p></article>)}</div></section></main>
 <footer><div className="brand"><div className="logo">M3</div><div><b>{brand.name}</b><span>{brand.tagline}</span></div></div><p>© 2026 {brand.name}</p><button onClick={()=>setSettings(true)}>Pengaturan</button></footer>

 {selected&&<div className="modal-bg" onClick={()=>setSelected(null)}><div className="detail" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><img src={selected.poster}/><div className="detail-copy"><span className="eyebrow">{selected.genre} · {selected.year}</span><h2>{selected.title}</h2><div className="stars">★ {selected.rating}</div><p>{selected.desc}</p><button className="primary"><Play size={18} fill="currentColor"/> Tonton Sekarang</button></div></div></div>}

 {settings&&<div className="modal-bg" onClick={()=>setSettings(false)}><div className="adminbox" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSettings(false)}><X/></button>
 {!admin?<><span className="eyebrow">ADMIN AREA</span><h2>Pengaturan</h2><p className="muted">Masukkan PIN untuk membuka panel administrator.</p><div className="pin"><Lock size={18}/><input autoFocus type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="PIN admin"/></div><button className="primary full" onClick={login}>Masuk</button></>:
 <><div className="admin-head"><div><span className="eyebrow">CONTROL CENTER</span><h2>Admin Panel</h2></div><button className="logout" onClick={()=>setAdmin(false)}><LogOut size={16}/> Keluar</button></div>
 <div className="tabs"><button className={tab==="movies"?"active":""} onClick={()=>setTab("movies")}>Film</button><button className={tab==="site"?"active":""} onClick={()=>setTab("site")}>Website</button></div>
 {tab==="movies"?<div><div className="admin-actions"><button className="primary" onClick={()=>setForm(empty)}><Plus size={17}/> Film Baru</button></div>
 {form.title!==""||form.id?<div className="editor"><h3>{form.id?"Edit Film":"Tambah Film"}</h3><div className="two"><label>Judul<input className="field" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><label>Tahun<input className="field" type="number" value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/></label></div><div className="two"><label>Genre<input className="field" value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})}/></label><label>Rating<input className="field" type="number" step=".1" min="0" max="10" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})}/></label></div><label>URL Poster<input className="field" value={form.poster} onChange={e=>setForm({...form,poster:e.target.value})}/></label><label>Sinopsis<textarea className="field area" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></label><button className="primary" onClick={saveMovie}><Save size={16}/> Simpan Film</button></div>:null}
 <div className="adminlist">{movies.map(m=><div className="adminrow" key={m.id}><img src={m.poster}/><div><b>{m.title}</b><small>{m.year} · {m.genre} · ★ {m.rating}</small></div><button onClick={()=>edit(m)}><Pencil size={16}/></button><button className="danger" onClick={()=>del(m.id)}><Trash2 size={16}/></button></div>)}</div></div>:
 <div className="site-settings"><label>Nama Website<input className="field" value={brand.name} onChange={e=>setBrand({...brand,name:e.target.value})}/></label><label>Teks kecil / Tagline<input className="field" value={brand.tagline} onChange={e=>setBrand({...brand,tagline:e.target.value})}/></label><label>PIN Admin Baru<input className="field" type="password" value={brand.pin} onChange={e=>setBrand({...brand,pin:e.target.value})}/></label><p className="muted">Data pengaturan dan film tersimpan di browser perangkat ini. Pada tahap berikutnya kita bisa sambungkan ke database online agar bisa diakses dari perangkat lain.</p></div>}
 </>}
 </div></div>}
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
