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
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Students = () => {
  const [data, setData] = useState([]);
  const [addStudent, setAddStudent] = useState({});
  const [add, setAdd] = useState(false);
  const [reload, setReload] = useState(false);
  // const [length, setLength] = useState(true);

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
      console.log('addStudent', addStudent);
    } else if (req === 1) {
      fetch(`http://localhost:8080/students/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(addStudent),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      alert('Student Details Updated');
    } else if (req === 2) {
      fetch(`http://localhost:8080/students/${id}`, {
        method: 'DELETE',
      });
      alert('Student Details Deleted');
    }
    setReload(!reload);
  };

  ///////////////////////////////////////////////////////////////

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  ///////////////////////////////////////////////////////////////

  const handleSort = () => {
    let temp = [...data];
    setData(temp.sort((a, b) => a.rollno - b.rollno));
  };

  ///////////////////////////////////////////////////////////////

  return (
    <div>
      {/* <Container> */}
      <Heading>
        EIM-Students-enroll{' '}
        <Button onClick={() => setAdd(!add)}>
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
              setOverlay(<OverlayOne />);
              handleSubmitStudent(0);
              onOpen();
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
          {/* ////////////////// */}
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Student <span color="red">Added</span> Successfully
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={(onClose, () => setAdd(!add))}>Okay!</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Class</Th>
                <Th>Roll No</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {length ? (
                <Heading>
                  No Students Details Here, Please Add to See Data
                </Heading>
              ) : (
                
              )} */}

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
                      onClick={
                        () => setAdd(true)
                        // () => handleSubmitStudent(1, e._id))
                      }
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
