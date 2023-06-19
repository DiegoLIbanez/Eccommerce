import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../../slices/usersApiSlice';


const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAmin] = useState('');

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

    const [uploadUser, { isLoading: loadingUpload }] = useUpdateUserMutation();

    const navigate = useNavigate();
    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setIsAmin(user.isAdmin)
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            await uploadUser({
                userId,
                name,
                email,
                isAdmin
            })
            toast.success('User updated');
            refetch();
            navigate('/admin/userlist');
        }catch(err){    
            toast.error(err?.data?.message || err.error);
        }
      };

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link> 
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpload && <Loader />}
            {isLoading ? <Loader/> : error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="isAdmin">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button type="submit" variant="primary" onClick={async (e) => {} } className='my-2'>
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default UserEditScreen
