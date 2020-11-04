import React, { useContext, useEffect, useState} from 'react'
import { Col, Row, ListGroup} from 'react-bootstrap';
import axios from 'axios'; 
import io from 'socket.io-cilent';
import { AuthUserCtx } from "../../context/authUser";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';


export const Chat = () => {
    const authUser = useContext(AuthUserCtx);
    const [listUser, setListUser] = useState([]);
    const [listOnline, setListOnline] = useState([]);

    useEffect(() => {
        const socket = io("http://10.1.8.202:5000");
        socket.emit('setOnline', {id: authUser._id, username: authUser.username});
        socket.on('onlineCount', (listOnlineUser) => {
            setListOnline(listOnlineUser);
        });
    }, [authUser._id, authUser.username]);

    useEffect(() => {
        axios.get("http://localhost:5000")
            .then((res) => setListUser(res.data));
    }, [])

    return (
        <Row style={{ height: 500 }}>
            <Col cs={3}>
                <div className="border h-100 rounded">
                    <span>Total Online: {listOnline.length}</span>
                    <ListGroup variant="flush">
                        {listUser.map((user) => (
                        <ListGroup.Item key={user._id} 
                        action 
                        className="d-flex justify-content-between">
                            <span>{user.username}</span>
                            {listOnline.some(online => online.id === user._id) ? (
                                <FontAwesomeIcon icon={faCircle} color="green" />)
                            : null }
                        </ListGroup.Item>))}
                    </ListGroup>
                </div>
            </Col>
            <Col cs={9}>
                <div class="d-flex flex-column h-100 border rounded">
                    <Header />
                    <div style={{ flex: 1 }}>
                        <Message />
                    </div>
                    <Composer />
                </div>
            </Col>
        </Row>
    )
}

const Header = () => {
    return <div>Header</div>
}

const Message = () => {
    return <div>Message</div>
}

const Composer = () => {
    return <div>Composer</div>
}

