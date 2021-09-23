import { useEffect, useState } from "react";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import LoadingSvg from './LoadingSvg'

const GetAllPassengers = gql`
  query MyQuery {
    anggota {
      jenis_kelamin
      id
      nama
      umur
    }
  }
`;

const GetSinglePassenger = gql`
  query MyQuery($id: Int!) {
    anggota(where: { id: { _eq: $id } }) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`;

const GetPassengerAge = gql`
  query MyQuery($umur: Int!) {
    anggota(where: { umur: { _eq: $umur } }) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`;

const GetPassengerName = gql`
  query MyQuery($nama: String!) {
    anggota(where: { nama: { _eq: $nama } }) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`;

const InsertPassenger = gql`
  mutation MyMutation($object: anggota_insert_input!) {
    insert_anggota_one(object: $object) {
      id
    }
  }
`

const DeletePassenger = gql`
  mutation MyMutation($id: Int!) {
    delete_anggota_by_pk(id: $id) {
      id
      nama
      umur
      jenis_kelamin
    }
  }
`
const UpdatePassenger = gql 
`mutation MyMutation4($nama: String!, $id: Int!) {
  update_anggota(where: {id: {_eq: $id}}, _set: {nama: $nama}) {
    affected_rows
  }
}`

function Home() {
  // Query ( Data Definition )
  const [getData,
    { data: singleData, 
      loading: loadingSingleData, 
      errorSingleData 
    },] = useLazyQuery(GetSinglePassenger);

  const [getAgeData,
    { data: singleAgeData, 
      loading: loadingSingleAgeData, 
      errorSingleAgeData 
    },] = useLazyQuery(GetPassengerAge);
    if (singleAgeData != []){
      console.log("singleData",singleData)
    }
  const [getNameData,
    { data: singleNameData, 
      loading: loadingSingleNameData, 
      errorSingleNameData 
    },] = useLazyQuery(GetPassengerName);
  const { data: allData, loading: loadingAllData, error: errorAllData } = useQuery(GetAllPassengers);

  // Mutation ( Data Manipulation )
  const [insertPassenger, { loading: loadingInsert}] = useMutation(InsertPassenger, {
    refetchQueries: [GetAllPassengers]
  });

  const [deletePassenger, { loading: loadingDelete}] = useMutation(DeletePassenger, {
    refetchQueries: [GetAllPassengers]
  });

  const [updatePassenger, { loading: loadingUpdate}] = useMutation(UpdatePassenger, {
    refetchQueries: [GetAllPassengers]
  });

  const [value, setValue] = useState(0);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    if (allData) {
      setPassengers(allData.anggota);
    }
  }, [allData]);

  useEffect(() => {
    if (singleData) {
      setPassengers(singleData.anggota);
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
        <ListPassenger data={singleData ? singleData.anggota : allData?.anggota} hapusPengunjung={hapusPengunjung}/>
      )}
      <PassengerInput tambahPengunjung={tambahPengunjung}/>
      {/* {singleData ? singleData.anggota.map(x => x.nama) : null} */}
    </div>
  );
}

export default Home;
