import { useEffect, useState } from "react";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import LoadingSvg from './LoadingSvg'
import useInsertPassenger from "../hooks/useInsertPassenger";
import useDeletePassenger from "../hooks/useDeletePassenger";
import useUpdatePassenger from "../hooks/useUpdatePassenger";
import useGetData from "../hooks/useGetData";
import { GetAllPassengers } from "../graphql/query";
import useSingleData from "../hooks/useSingleData";
import useGetPassengerAge from "../hooks/useGetPassengerAge";
import useGetPassengerName from "../hooks/useGetPassengerName";

function Home() {
  // Query ( Data Definition )
  const {subscribePassenger} = useGetData();
  const {getData,singleData,loadingSingleData,errorSingleData} = useSingleData();
  const {getAgeData, singleAgeData, loadingSingleAgeData} = useGetPassengerAge();
  const {getNameData, singleNameData, loadingSingleNameData} = useGetPassengerName();

  const { data: allData, loading: loadingAllData, error: errorAllData } = useQuery(GetAllPassengers);

  // Mutation ( Data Manipulation )

  const { insertPassenger, loadingInsert } = useInsertPassenger();
  const { deletePassenger, loadingDelete } = useDeletePassenger();
  const { loadingUpdate } = useUpdatePassenger();

  const [value, setValue] = useState(0);
  const [passengers, setPassengers] = useState([]);
  const [passengersID, setPassengersID] = useState([]);

  console.log("passengers : ", passengers);
  console.log("setpassengers : ", setPassengers);

  useEffect(() => {
    subscribePassenger()
  }, [])

  useEffect(() => {
    if (allData) {
      setPassengers(allData.anggota);
    }
  }, [allData]);

  useEffect(() => {
    if (singleData) {
      setPassengersID(singleData.anggota);
    }
  }, [singleData]);

  useEffect(() => {
    if (singleAgeData) {
      setPassengers(singleAgeData.anggota);
    }
  }, [singleAgeData]);

  useEffect(() => {
    if (singleNameData) {
      setPassengers(singleNameData.anggota);
    }
  }, [singleNameData]);

  const showAllData = () => {
    setPassengers(allData.anggota);
  };

  const HandlerId = () => {
    getData({
      variables: {
        id: value,
      },
    });
  };

  const HandlerNama = () => {
    getNameData({
      variables: {
        nama: value,
      },
    });
  };

  const HandlerUmur = () => {
    getAgeData({
      variables: {
        umur: value,
      },
    });
  };

  const tambahPengunjung = (newUser) => {
    const newData = {
        ...newUser
    }
    insertPassenger({variables :{
      object: {
        id: newData.id,
        nama: newData.nama,
        umur: newData.umur,
        jenis_kelamin: newData.jenisKelamin
      }   
    }})
  }

  const hapusPengunjung = (idx) => {
    deletePassenger({variables: {
      id: idx
    }})
  }

  const filteredData = () => {
    if (singleData?.anggota != null){
      return singleData?.anggota
    } else if (singleAgeData?.anggota != null){
      return singleAgeData?.anggota
    } else if (singleNameData?.anggota != null){
      return singleNameData?.anggota
    } else {
      return allData?.anggota
    }
  }

  if (errorSingleData || errorAllData) {
    return <p>Something Went Wrong...</p>;
  }

  return (
    <div>
      <Header />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button style={{ marginBottom: "20px" }} onClick={HandlerId}>
        Search By ID
      </button>
      <button style={{ marginBottom: "20px" }} onClick={HandlerNama}>
        Search By Name
      </button>
      <button style={{ marginBottom: "20px" }} onClick={HandlerUmur}>
        Search By Age
      </button>
      <button onClick={showAllData}>Show All</button>
      {errorAllData && <p>Something Went Wrong...</p>}
      {(loadingAllData || loadingSingleData || loadingSingleAgeData || loadingSingleNameData || loadingInsert || loadingDelete || loadingUpdate) && (
        <div className="center">
        <LoadingSvg/>
        </div>
      )}
      {!errorAllData && !loadingAllData && !loadingSingleData && !loadingSingleAgeData && !loadingSingleNameData && (
        <ListPassenger data={filteredData()} hapusPengunjung={hapusPengunjung}/>
        // <ListPassenger data={singleData ? singleData.anggota : allData?.anggota} hapusPengunjung={hapusPengunjung}/>
      )}
      <PassengerInput tambahPengunjung={tambahPengunjung}/>
    </div>
  );
}

export default Home;
