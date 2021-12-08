import { Control, LocalForm, Errors } from 'react-redux-form';
import {
    Modal, ModalHeader, ModalBody, Label, Button, FormGroup
} from 'reactstrap';
import React, { useState } from 'react';
import { forwardRef, useImperativeHandle } from "react";
import { toast } from 'react-toastify';
const FormStaff = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleModal() {
            setToggleModal(!toggleModal)
        }
    }))

    const [toggleModal, setToggleModal] = useState(false)

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const maxNumber = (num) => (val) => !(val) || (val <= num);
    const minNumber = (num) => (val) => val && (val >= num)

    const handleSubmit = (value) => {
        setToggleModal(!toggleModal)
        props.addNewStaff(
            props.staffs.length,
            value.fullName,
            value.doB,
            value.startDate,
            value.department,
            value.salaryScale,
            value.annualLeave,
            value.overTime,
            "/asset/images/alberto.png")
        console.log('check add Staff', props.addNewStaff)
        toast.success('Thêm nhân viên thành công');

    }

    return (
        <Modal isOpen={toggleModal}>
            <ModalHeader toggle={() => { setToggleModal(!toggleModal) }}>THÊM NHÂN VIÊN</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => { handleSubmit(values) }} initialState={props.staff}>
                    <FormGroup>
                        <Label md={3} >
                            Họ và Tên
                        </Label>
                        <Control.text
                            model=".fullName"
                            type="text"
                            validators={{
                                required, minLength: minLength(5), maxLength: maxLength(20)
                            }}

                        />
                        <Errors
                            className="text-danger"
                            model=".fullName"
                            show="touched"
                            messages={{
                                required: 'Phải nhập',
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
                        <Label md={3} htmlFor="department">
                            Phòng Ban
                        </Label>
                        <Control.select
                            model=".department"
                            type="text"
                            id="department"
                            name="department"
                            validators={{ required }}
                        >
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
                    <Button type="submit">Add</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
    )
})

export default FormStaff;
