import React, { useRef, useState } from 'react';
import {
    Card, CardImg, CardTitle, Col, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import FormStaff from './FormStaffComponent';
import { Fade, Loop } from 'react-animation-components'



const RenderStaffs = ({ staff }) => {
    return (
        <Loop in interval={1000} iterations={0.1}>
            <Fade in enterOpacity={2}>
                <Link className="text-decoration-none" to={`/staffs/${staff.id}`} >
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardTitle style={{ textAlign: "center" }}>{staff.name}</CardTitle>
                </Link>
            </Fade>
        </Loop>
    )
}


const StaffList = (props) => {

    //============ Tìm Nhân Viên ============//
    const [search, setSearch] = useState("");
    const filterStaff = props.staffs.filter((staff) => {
        return staff.name.toUpperCase().includes(search.toUpperCase()) === true;
    });

    //============ Thêm Nhân Viên ============//
    const formStaffRef = useRef();

    return (
        <div className="container">
            <input className="searchSet"
                type="text"
                placeholder=" Search..."
                value={search}
                onChange={(event) => { setSearch(event.target.value) }} />
            <Button className="fa fa-plus btn btn-primary" onClick={() => formStaffRef.current.handleModal()}> ADD NEW STAFF</Button>
            <FormStaff ref={formStaffRef} addNewStaff={props.addNewStaff} staffs={props.staffs} />
            <div className="row">
                {filterStaff.map((staff) => {
                    return (
                        < Col key={staff.id} xs={6} md={4} lg={2}>
                            <RenderStaffs staff={staff} />
                        </Col>
                    )
                })}
            </div>
        </div >
    );
}
export default StaffList;