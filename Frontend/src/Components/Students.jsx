import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Button,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Students = () => {
  const [data, setData] = useState([]);
  const [addStudent, setAddStudent] = useState({});
  const [add, setAdd] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(0);
  const [id, setId] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [edit, setEdit] = useState({});
  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    fetch(`https://eim-student-enroll.herokuapp.com/students`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, [reload]);

  // let rollArr = data.map(e => e.rollno);
  let temp_Roll = Math.floor(Math.random() * 10000 + 1);

  ///////////////////////////////////////////////////////////////

  const handleChange = e => {
    if (enableEdit === true) {
      setEdit({ ...edit, [e.target.name]: e.target.value });
      // let check = roll_Roll.forEach(e => e == edit.rollno);
      // if (check == true) console.log(check);
    } else setAddStudent({ ...addStudent, [e.target.name]: e.target.value });
  };

  ///////////////////////////////////////////////////////////////

  const handleSubmitStudent = (req, id) => {
    if (req === 0) {
      fetch(`https://eim-student-enroll.herokuapp.com/students`, {
        method: 'POST',
        body: JSON.stringify(addStudent),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      alert('Added');
      setAdd(!add);
      setAddStudent({});
    } else if (req === 1) {
      let temp = addStudent;
      if (enableEdit === true) temp = edit;
      fetch(`https://eim-student-enroll.herokuapp.com/students/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(temp),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      setAdd(!add);
      setAddStudent({});
      alert('Updated Succesfully');
    } else if (req === 2) {
      fetch(`https://eim-student-enroll.herokuapp.com/students/${id}`, {
        method: 'DELETE',
      });
      alert('Student Details Deleted');
    }
    setReload(!reload);
  };

  ///////////////////////////////////////////////////////////////

  const handleSort = () => {
    let temp = [...data];
    setData(temp.sort((a, b) => a.rollno - b.rollno));
  };

  ///////////////////////////////////////////////////////////////

  const handleEditForm = id => {
    fetch(`https://eim-student-enroll.herokuapp.com/students/${id}`)
      .then(res => res.json())
      .then(res => setEdit(res))
      .catch(err => console.log(err));

    setEnableEdit(true);
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '80px',
          display: 'grid',
          placeItems: 'center',
          margin: 'auto',
          backgroundColor: '#3F4E4F',
          borderRadius: '10px',
        }}
      >
        <Heading>
          <span style={{ fontFamily: 'Georgia, serif', color: 'white' }}>
            <Link to={'/'}>EIM-Students-Enroll</Link>
          </span>{' '}
          <Button
            onClick={() => {
              setAdd(!add);
              setUpdate(0);
            }}
            style={{ marginLeft: '200px' }}
          >
            {add ? 'Cancel' : 'Add Student'}
          </Button>
          <Button ml={15} onClick={handleSort}>
            Sort By RollNo
          </Button>
        </Heading>
      </div>
      <br />

      {add ? (
        <Container>
          <Heading>Please Fill the Form</Heading>
          <form action="">
            <label> Enter Student Name :</label>
            <Input
              variant="filled"
              placeholder="Name"
              value={edit.name === '' ? addStudent.name : edit.name}
              name="name"
              onChange={e => handleChange(e)}
            />
            <label> Enter Student Age :</label>
            <Input
              variant="filled"
              placeholder="Age"
              value={edit.age === '' ? addStudent.age : edit.age}
              name="age"
              onChange={e => handleChange(e)}
            />
            <label> Enter Student Roll No :</label>
            <Input
              variant="filled"
              placeholder="Roll Number"
              value={enableEdit === false ? addStudent.rollno : edit.rollno}
              name="rollno"
              onChange={e => handleChange(e)}
            />
            <label> Enter Student Class :</label>
            <Input
              variant="filled"
              placeholder="Class"
              value={edit.class === '' ? addStudent.class : edit.class}
              name="class"
              onChange={e => handleChange(e)}
            />
            <br />
            <br />
            <Button
              onClick={() => {
                update === 0
                  ? handleSubmitStudent(0)
                  : handleSubmitStudent(1, id);
              }}
              // disabled={
              //   !addStudent.name ||
              //   !addStudent.age ||
              //   !addStudent.rollno ||
              //   !addStudent.class
              // }
            >
              Submit Details
            </Button>
          </form>
          {/* ////////////////// */}
        </Container>
      ) : (
        <TableContainer w={'70%'} m="auto" border="1px solid black">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Class</Th>
                <Th>Roll No</Th>
                <Th>To Edit</Th>
                <Th>To Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((e, i) => (
                <Tr key={e._id}>
                  <Td>{i + 1}</Td>
                  <Td>{e.name}</Td>
                  <Td>{e.class}</Td>
                  <Td>{e.age}</Td>
                  <Td>{e.rollno}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={() => {
                        handleEditForm(e._id);
                        setAdd(true);
                        setUpdate(1);
                        setId(e._id);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleSubmitStudent(2, e._id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <br />
    </div>
  );
};

export default Students;
