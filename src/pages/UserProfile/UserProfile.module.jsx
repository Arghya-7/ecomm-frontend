import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useEffect, useRef, useState} from "react";
import styles from "./UserProfile.module.css";
import api from "../../config/AuthHeader"

export default function UserProfile(){
    const loaded = useRef(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState( null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get(process.env.REACT_APP_BACKEND_URL + "/users/getUserDetails");
            setFormData(data.data);
        }
        if(!loaded.current){
            loaded.current = true;
            fetchData();
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const  handleSave = async () => {
        // 🔗 Call backend API here
        // await axios.put("/api/users/profile", formData);
        const response = await api.put(process.env.REACT_APP_BACKEND_URL + "/users/updateUserDetails", formData);
        setFormData(response.data);
        setIsEdit(false);
    };

    const handleCancel = async () => {
        const data = await api.get(process.env.REACT_APP_BACKEND_URL + "/users/getUserDetails");
        setFormData(data.data);
        setIsEdit(false);
    };

    return (<div>
        <Header />
            {formData &&
                <div className={styles.profileContainer}>

                    {/* LEFT */}
                    <div className={styles.profileLeft}>
                        <img
                            src={formData.avatar || "https://i.pravatar.cc/150"}
                            alt="User"
                            className={styles.avatar}
                        />
                        {isEdit ? (
                            <input
                                className={styles.input}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        ) : (
                            <h3 className={styles.name}>{formData.name}</h3>
                        )}
                        <p className={styles.email}>{formData.email}</p>
                    </div>

                    {/* RIGHT */}
                    <div className={styles.profileRight}>
                        <h2 className={styles.sectionTitle}>
                            {isEdit ? "Edit Profile" : "Profile Details"}
                        </h2>

                        {/* PHONE */}
                        <div className={styles.detailRow}>
                            <span>Phone</span>
                            {isEdit ? (
                                <input
                                    className={styles.input}
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>{formData.phone}</span>
                            )}
                        </div>

                        {/* ADDRESS */}
                        <div className={styles.detailRow}>
                            <span>Address</span>
                            {isEdit ? (
                                <input
                                    className={styles.input}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>{formData.address}</span>
                            )}
                        </div>

                        {/* BUTTONS */}
                        <div className={styles.actionRow}>
                            {isEdit ? (
                                <>
                                    <button className={styles.saveBtn} onClick={handleSave}>
                                        Save
                                    </button>
                                    <button className={styles.cancelBtn} onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className={styles.editBtn}
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            }
        <Footer/>
    </div>);
}