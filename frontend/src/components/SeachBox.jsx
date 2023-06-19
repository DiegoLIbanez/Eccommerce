import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"


const SeachBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || "");

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            setKeyword("")
            navigate(`/search/${keyword}`);
        }else{
            navigate("/");
        }
    }

  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="me-sm-2 ms-sm-5"
            value={keyword}
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2 mx-2">
            Search
        </Button>
    </Form>
  )
}

export default SeachBox
