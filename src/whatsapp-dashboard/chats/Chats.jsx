import React, { useState } from "react";
import axios from "axios";
import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import "./chats.scss";
import man1 from "../../assets/man1.png";
import man2 from "../../assets/man2.png"
import lady2 from "../../assets/lady1.png"

const dummyAgents = [
    { name: "Agent A", image: man1 },
    { name: "Agent B", image:  man2},
    { name: "Agent C", image: lady2 },
    { name: "Agent D", image: man2 },
    { name: "Agent E", image: man1 },
    { name: "Agent F", image: man2 },
];

const dummyContacts = {
    "Agent A": [
        { name: "John Doe", phone: "+918123456789" },
        { name: "Ravi Kumar", phone: "+917898989898" },
    ],
    "Agent B": [
        { name: "Jane Smith", phone: "+919876543210" },
        { name: "Amit Shah", phone: "+911234567890" },
    ],
    "Agent C": [
        { name: "Anjali Mehta", phone: "+919999888877" },
    ],
};

const Chats = () => {
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [tabValue, setTabValue] = useState(0);

    const contacts = selectedAgent ? dummyContacts[selectedAgent.name] || [] : [];

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchMessages = async (contactPhone) => {
        try {
            const response = await axios.get(`http://localhost:3000/messages/${contactPhone}`, {
                headers: {
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache",
                    "Expires": "0"
                }
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedContact) return;

        try {
            await axios.post("http://localhost:3000/send-whatsapp", {
                to: selectedContact.phone,
                message: newMessage,
            });

            setMessages([...messages, { sender: "agent", text: newMessage }]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <div className="dashboard">
            <div className="agent-rail">
                <List>
                    {dummyAgents.map((agent, index) => (
                        <ListItem
                            key={index}
                            button
                            selected={selectedAgent?.name === agent.name}
                            onClick={() => {
                                setSelectedAgent(agent);
                                setSelectedContact(null);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={agent.image} alt={agent.name} />
                            </ListItemAvatar>
                        </ListItem>
                    ))}
                </List>
            </div>

            <div className="contact-list">
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    className="search-bar"
                />

                <Tabs
                    value={tabValue}
                    onChange={(e, newVal) => setTabValue(newVal)}
                    variant="fullWidth"
                    className="tabs"
                >
                    <Tab label="All" />
                    <Tab label="Unread" />
                    <Tab label="Unreplied" />
                </Tabs>

                <Divider />

                <List className="contacts-scroll">
                    {filteredContacts.map((contact, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => {
                                setSelectedContact(contact);
                                fetchMessages(contact.phone);
                            }}
                            selected={selectedContact?.phone === contact.phone}
                        >
                            <ListItemText primary={contact.name} />
                        </ListItem>
                    ))}
                </List>
            </div>

            <div className="contact-details">
                {selectedContact ? (
                    <Box className="chat-section">
                        <Typography variant="h6" className="chat-header">
                            Chat with {selectedContact.name}
                        </Typography>

                        <Box className="chat-box">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={msg?.sender === "agent" ? "agent-msg" : "customer-msg"}
                                >
                                    {msg?.text}
                                </div>
                            ))}
                        </Box>

                        <Box className="message-input">
                            <TextField
                                fullWidth
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                size="small"
                            />
                            <Button onClick={sendMessage} variant="contained">Send</Button>
                        </Box>
                    </Box>
                ) : (
                    <div className="doodle">Select a customer to chat</div>
                )}
            </div>
        </div>
    );
};

export default Chats;
