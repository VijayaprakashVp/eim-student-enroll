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
  // ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Students = () => {
  const [data, setData] = useState([]);
  console.log('data', data);
  const [addStudent, setAddStudent] = useState({});
  const [add, setAdd] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(0);
  const [id, setId] = useState('');

  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    fetch(`http://localhost:8080/students`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, [reload]);
  // if (data.length > 0) setLength(false);

  ///////////////////////////////////////////////////////////////

  const handleChange = e => {
    setAddStudent({ ...addStudent, [e.target.name]: e.target.value });
  };

  ///////////////////////////////////////////////////////////////

  const handleSubmitStudent = (req, id) => {
    if (req === 0) {
      fetch(`http://localhost:8080/students`, {
        method: 'POST',
        body: JSON.stringify(addStudent),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      // console.log('addStudent', addStudent);
      alert('Added');
      setAdd(!add);
      setAddStudent({});
    } else if (req === 1) {
      // setAdd(true);
      fetch(`http://localhost:8080/students/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(addStudent),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      setAdd(!add);
      setAddStudent({});
      // alert('Student Details Updated');
    } else if (req === 2) {
      fetch(`http://localhost:8080/students/${id}`, {
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

  return (
    <div>
      {/* <Container> */}
      <Heading w={'52%'} m="auto">
        EIM-Students-enroll{' '}
        <Button
          onClick={() => {
            setAdd(!add);
            setUpdate(0);
          }}
        >
          {add ? 'Cancel' : 'Add Student'}
        </Button>
        <Button ml={15} onClick={handleSort}>
          Sort By RollNo
        </Button>
      </Heading>
      <br />

      {add ? (
        <Container>
          <Heading>Please Fill the Form</Heading>
          <form action="">
            <label> Enter Student Name :</label>
            <Input
              variant="filled"
              placeholder="Name"
              value={addStudent.name}
              name="name"
              onChange={e => handleChange(e)}
            />
            <label> Enter Student Age :</label>
            <Input
              variant="filled"
              placeholder="Age"
              value={addStudent.age}
              name="age"
              onChange={e => handleChange(e)}
            />
            <label> Enter Student Roll No :</label>
            <Input
              variant="filled"
              placeholder="Roll Number"
              value={addStudent.rollno}
              name="rollno"
              onChange={e => handleChange(e)}
            />
            <label> Enter Student Class :</label>
            <Input
              variant="filled"
              placeholder="Class"
              value={addStudent.class}
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
              disabled={
                !addStudent.name ||
                !addStudent.age ||
                !addStudent.rollno ||
                !addStudent.class
              }
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
      {/* </Container> */}
    </div>
  );
};

export default Students;
