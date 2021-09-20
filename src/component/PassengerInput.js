import { Component } from "react";
import "./Home.css";

class PassengerInput extends Component {
      state = {
        nama: "",
        umur: "",
        jenisKelamin: "Pria",
        editing: true
      }
      onChange = e => {
        this.setState({
          [e.target.name]: e.target.value,    
        })
      }
    
      handleSubmit = e => {
        e.preventDefault();
        if(this.state.nama.trim() && this.state.umur && this.state.jenisKelamin) {
          const umur = this.state.umur
          if (umur >= 75 || umur <= 12) {
            alert("Umur tidak sesuai")
          } else {
            const newData = {
              nama: this.state.nama,
              umur: this.state.umur,
              jenisKelamin: this.state.jenisKelamin
            }
            this.props.tambahPengunjung(newData);
            this.setState({    
              nama: "",
              umur: "",
              jenisKelamin: "Pria"
            });
          }
        } else {
          alert("Data masih ada yang kosong")
        } 
      };

      handleBukaInput = () => {
        this.setState({
            editing: false
          })
      }

      handleTutupInput = () => {
        this.setState({
            editing: true
          })
      }
    
      render() {

        let viewMode = {};
        let editMode = {};

        if (this.state.editing) {
            viewMode.display = 'none';
        } else {
            editMode.display = 'none';
        }

        return (
            <div>
                <div onSubmit={this.handleSubmit} style={viewMode}>
                    <p>Masukkan Nama Anda</p>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nama anda ..."
                        value={this.state.nama}
                        name="nama"          
                        onChange={this.onChange}
                    />
                    <p>Masukkan Umur Anda</p>
                    <input
                        type="number"
                        className="input-text"
                        placeholder="Umur anda ..."
                        value={this.state.umur}
                        name="umur"          
                        onChange={this.onChange}
                    />
                    <p>Masukkan Jenis Kelamin Anda</p>
                    <select onChange={this.onChange} name="jenisKelamin">
                      <option value="Pria" selected>Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                    <p></p>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <button onClick={this.handleTutupInput} style={{marginLeft: "10px"}}>Selesai</button>
                </div>
                <button className="inputan" onClick={this.handleBukaInput} style={editMode}>Masukkan Nama Pelanggan</button>
            </div>
        )
      }
}

export default PassengerInput;