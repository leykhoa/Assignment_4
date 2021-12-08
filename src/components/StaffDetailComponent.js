import dateFormat from 'dateformat';
import React, { useState } from 'react';
import {
    CardBody, Breadcrumb, BreadcrumbItem, Col, Modal, ModalHeader, ModalBody, Label, Button, FormGroup
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { toast } from 'react-toastify';


const RenderStaff = ({ staff, departments, updateStaff, deleteStaff }) => {
    const department = departments.find((item) => item.id === staff.departmentId);

    //=====CẬP NHẬT THÔNG TIN NHÂN VIÊN===//
    const [toggleModal, setToggleModal] = useState(false)
    const required = (val) => val && val.length
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const maxNumber = (num) => (val) => !(val) || (val <= num);
    const minNumber = (num) => (val) => val && (val >= num)


    const handleSubmit = (value) => {
        setToggleModal(!toggleModal)
        updateStaff(
            staff.id,
            value.name,
            value.doB,
            value.startDate,
            value.department,
            value.salaryScale,
            value.annualLeave,
            value.overTime,
            "/asset/images/alberto.png")
        toast.success('Cập nhật thông tin thành công');
    }
    console.log('check staff type', typeof (staff.salaryScale))
    //===============XÓA NHÂN VIÊN=================//
    const history = useHistory();
    const handleDelete = () => {
        let c = window.confirm('Bạn chắn chắn muốn xóa Nhân viên');
        if (c === true) {
            deleteStaff(
                staff.id
            )
            toast.success('Xóa Nhân viên thành công')
            history.push("/staffs")
        }
    }

    if (staff) {
        return (
            <div key={staff.id} className="container" >
                <Col xs={12} md={4} lg={3} className="style-inline">
                    <img src={staff.image} alt={staff.name} width={"100%"} />
                </Col>
                <Col xs={12} md={8} lg={8} className="style-inline">
                    <CardBody className="staff" key={staff.departmentId}>
                        <p>Họ và tên: <b>{staff.name}</b></p>
                        <p>Ngày sinh: <b>{dateFormat(staff.doB, "dd/mm/yyyy")}</b></p>
                        <p>Ngày vào công ty: <b>{dateFormat(staff.startDate, "dd/mm/yyyy")}</b></p>
                        <p>Phòng ban:<b>
                            {department && department.name}
                        </b></p>
                        <p>Số ngày nghỉ còn lại: <b>{staff.annualLeave}</b></p>
                        <p>Số ngày đã làm thêm: <b>{staff.overTime}</b></p>
                        <Button onClick={() => setToggleModal(!toggleModal)}>CẬP NHẬT</Button>
                        <Button onClick={handleDelete} >XÓA</Button>
                    </CardBody>
                </Col>
                <Modal isOpen={toggleModal}>
                    <ModalHeader toggle={() => { setToggleModal(!toggleModal) }}>CẬP NHẬT THÔNG TIN</ModalHeader>
                    <ModalBody>
                        {console.log('check staff', staff)}
                        <LocalForm onSubmit={(value) => handleSubmit(value)} initialState={staff} >
                            <FormGroup>
                                <Label md={3}>
                                    Họ và Tên
                                </Label>
                                <Control.text
                                    model=".name"
                                    type="text"
                                    validators={{
                                        minLength: minLength(5), maxLength: maxLength(20)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Phải lớn hơn 5 ký tự',
                                        maxLength: 'Phải nhỏ hơn 20 ký tự'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label md={3} >
                                    Ngày sinh
                                </Label>
                                <Control.text
                                    model=".doB"
                                    type="date"
                                    validators={{ required }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".doB"
                                    show="touched"
                                    messages={{
                                        required: 'Phải nhập ngày sinh',
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label md={3} >
                                    Ngày vào công ty
                                </Label>
                                <Control.text
                                    model=".startDate"
                                    type="date"
                                    validators={{ required }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".startDate"
                                    show="touched"
                                    messages={{
                                        required: 'Phải nhập ngày vào công ty'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label md={3} >
                                    Phòng Ban
                                </Label>
                                <Control.select
                                    model=".department"
                                    type="text"
                                    id="department"
                                    name="department"
                                    validators={{ required }}
                                >
                                    <option value='' selected>---Select---</option>
                                    <option value="Dept01">Sale</option>
                                    <option value="Dept02">HR</option>
                                    <option value="Dept03">Marketing</option>
                                    <option value="Dept04">IT</option>
                                    <option value="Dept05">Finance</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".department"
                                    show="touched"
                                    messages={{
                                        required: 'Phải chọn phòng ban'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label md={3}>
                                    Hệ số lương
                                </Label>
                                <Control.text
                                    model=".salaryScale"
                                    type="number"
                                    id="salaryScale"
                                    name="salaryScale"
                                    validators={{
                                        required, minNumber: minNumber(1), maxNumber: maxNumber(20)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        required: 'Không để trống',
                                        maxNumber: 'Hệ số lương phải < 20',
                                        minNumber: 'Hệ số lương phải >=1'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label md={3}>
                                    Số ngày nghỉ còn lại
                                </Label>
                                <Control.text
                                    model=".annualLeave"
                                    type="number"
                                    validators={{
                                        required, minNumber: minNumber(0), maxNumber: maxNumber(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".annualLeave"
                                    show="touched"
                                    messages={{
                                        required: 'Không để trống',
                                        maxNumber: 'Số ngày nghỉ còn lại phải <= 15',
                                        minNumber: 'Hệ số lương phải >=0'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label md={3}>
                                    Số ngày làm thêm
                                </Label>
                                <Control.text
                                    model=".overTime"
                                    type="number"
                                    validators={{
                                        required, minNumber: minNumber(0), maxNumber: maxNumber(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".overTime"
                                    show="touched"
                                    messages={{
                                        required: 'Không để trống',
                                        maxNumber: 'Số ngày làm thêm phải <= 15',
                                        minNumber: 'Số ngày làm thêm phải >=0'
                                    }} />
                            </FormGroup>
                            <Button type="submit">CẬP NHẬT</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const Staff = (props) => {
    if (props.staff != null)
        return (
            <div className="container" >
                <div className="row" >
                    <Breadcrumb  >
                        <BreadcrumbItem><Link to='/staffs' className="text-decoration-none">Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <RenderStaff
                        staff={props.staff}
                        departments={props.departments}
                        updateStaff={props.updateStaff}
                        deleteStaff={props.deleteStaff} />
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}

export default Staff;