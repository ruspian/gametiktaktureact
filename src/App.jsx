import { useState } from 'react'

// fungsi mengklik komponen kotak
function Kotak({ nilai, saatKlikKotak }) {
  return <button className="kotak" onClick={ saatKlikKotak }>{ nilai }</button>
}

function App({ siapaSelanjutnya, semuaKotak, saatMulai }) {
  // fungsi saat klik dan mengganti array null dengan  nilai input
  function saatKlik(i) {
    // membuat kotak yang sudah ada isi agar tidak bisa diklik
    if(semuaKotak[i] || cariPemenang(semuaKotak)) return;

    const nextKotak = semuaKotak.slice(); 
    // pengkondisian pemilihan selanjutnya
    nextKotak[i] = siapaSelanjutnya ? 'X' : 'O';
    saatMulai(nextKotak);
  };

  // menang atau lanjut
  const pemenang = cariPemenang(semuaKotak);
  let status = '';
  if(pemenang) {
    status = 'Pemenangnya : ' + pemenang;
  } else {
    status = 'giliran : ' + (siapaSelanjutnya ? 'X' : 'O');
  };

  return (
  // menjalankan kotak-kotak 
    <>
      {/* menampilkan status */}
      <div className='status'> {status} </div>
      {/* menampilkan kotak */}
      <div className='papan'>
        <Kotak nilai={semuaKotak[0]} saatKlikKotak={() => saatKlik(0)} />
        <Kotak nilai={semuaKotak[1]} saatKlikKotak={() => saatKlik(1)} />
        <Kotak nilai={semuaKotak[2]} saatKlikKotak={() => saatKlik(2)} /> 
        <Kotak nilai={semuaKotak[3]} saatKlikKotak={() => saatKlik(3)} />
        <Kotak nilai={semuaKotak[4]} saatKlikKotak={() => saatKlik(4)} /> 
        <Kotak nilai={semuaKotak[5]} saatKlikKotak={() => saatKlik(5)} />
        <Kotak nilai={semuaKotak[6]} saatKlikKotak={() => saatKlik(6)} />
        <Kotak nilai={semuaKotak[7]} saatKlikKotak={() => saatKlik(7)} />
        <Kotak nilai={semuaKotak[8]} saatKlikKotak={() => saatKlik(8)} />
      </div>
    </>
  );
};

function Game() {
  // menentukan inputan selanjutnya
  // const [siapaSelanjutnya, setSiapaSelanjutnya] =useState(true);
  // menentukan kotak-kotak
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // mementukan kita berada di pindah ke berapa
  const [terakhirPindah, setTerakhirPindah] = useState(0);
  // menentukan selanjutnya x atau o
  const siapaSelanjutnya = terakhirPindah % 2 === 0;
  // kotak di klik terakhir
  const terakhirKlik = history[terakhirPindah];

  function loncatKe(nextPindah) {
    setTerakhirPindah(nextPindah);
    // setSiapaSelanjutnya(nextPindah % 2 === 0);
  }

  // fungsi untuk menghandel permainan
  function hendelGame(nextKotak) {
    const historyBaru = [...history.slice(0, terakhirPindah + 1), nextKotak];
    setHistory(historyBaru);
    setTerakhirPindah(historyBaru.length - 1);
    // setSiapaSelanjutnya(!siapaSelanjutnya);
  };

  const pindahPindah = history.map((semuaKotak, pindah) => {
    let teks = '';
    if( pindah > 0 ) {
      teks = 'Pindah Ke #' + pindah;
    } else {
      teks = 'Mulai Permainan!';
    };

    return (
      <li key={pindah}>
        <button onClick={() => loncatKe(pindah)}> {teks} </button>
      </li>
    )
  });

  return(
    <div className="game">
      <div className="papan-game">
        <App siapaSelanjutnya={siapaSelanjutnya} semuaKotak={terakhirKlik} saatMulai={hendelGame} />
      </div>
      <div className="game-info">
        <ol>{ pindahPindah }</ol>
      </div>
    </div>
  )
}


// fungsi pencarian pemenang
function cariPemenang(semuaKotak) {
  // penentuan jika menang
  const garis = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
  ];
  
  for(let i = 0; i < garis.length; i++) {
    // menentukan jika hasil sama
    const [ a, b, c] = garis[i];
    // jika semua sama
    if(semuaKotak[a] && semuaKotak[a] === semuaKotak[b] && semuaKotak[b] === semuaKotak[c]) {
      return semuaKotak[a];
    };

  };
  return false;
};

export default Game;
