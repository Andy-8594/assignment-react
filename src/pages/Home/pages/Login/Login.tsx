//@ts-ignore
import React, { useState, useEffect, useCallback, Fragment } from "react";
//@ts-ignore
import { Link, useParams } from 'react-router-dom';
//@ts-ignore
import { useForm } from "react-hook-form";
import { isConstructorTypeNode } from "typescript";
import { toastError, toastSuccess } from "../../../../services/toastService";
import Swal from 'sweetalert2';
//@ts-ignore
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATHS } from "../../../../constants/paths";
import axios from "axios";

type LoginFormData = {
    Email: string;
    Password: string;
}


type UserData = {
    createAt: string;
    name: string;
    id: string;
}

const Login = () => {
    const history = useHistory();
    
    const validationSchema = Yup.object().shape({
        Email: Yup.string()
            .required('Email must be insert')
            .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must be valid email '),
        Password: Yup.string()
            .required('Password must be insert')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/, 'Password have at least 8 character include 1 uppercase, 1 lowercase, 1 special character, 1 digit number '),
      });
    
    const formOptions = { resolver: yupResolver(validationSchema) };
    
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    
    const { errors } = formState;
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [onShowPassword, setOnShowPassword] = useState(false);

    const [user, setUser] = useState<UserData[]>([]);

    const onSubmit = handleSubmit((formData: LoginFormData) => {
        axios.post("https://60dff0ba6b689e001788c858.mockapi.io/tokens")
        .then((response) => {
            if (response.status === 201) {
                toastSuccess("Login Successfully!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("iduser", response.data.userid);
                // getUserData(response)
                // localStorage.setItem("user", user)
                setIsLoggedIn(true)
                history.push(PATHS.PROFILE)
              }
        })
        .catch(error => {
            console.log(error)
        })
    });

    const getUserData = (response: any) => {
        debugger
        axios.get("https://60dff0ba6b689e001788c858.mockapi.io/users/" + response.data.userid)
        .then((response) => {
            console.log(response)
            toastSuccess("Load Successfully!");
            setUser(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const CloseForm = () => {
        history.push(PATHS.MAIN)
    }
  
    const onChangeShowPassword = () => {
        if(onShowPassword == true){
            setOnShowPassword(false)
        }
        else{
            setOnShowPassword(true)
        }
    }
    
    const token = localStorage.getItem("token");
  

    useEffect(() => {
      if (token !== undefined && token !== null) {
        setIsLoggedIn(true);
      }
    }, [isLoggedIn]);

    return (
      <div className="bg-white sm:w-10/12 w-11/12 ml-4 sm:ml-36 mt-3 mb-16 sm:mt-7 rounded">
        {isLoggedIn == true ? 
        (
            <div>
                <a href={PATHS.PROFILE}>You are logged in. Please click here to come to profile page</a>
            </div>
        )
        : 
        (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-brown flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl text-white font-semibold">
                            Login
                        </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex flex-auto">
                        <div className="sm:flex flex-grow flex-col w-full">
                            <div className="flex-grow w-full">
                                <label htmlFor="" className="text-sm font-bold text-gray block p-1">
                                    <i className="fa fa-envelope-o"></i>  Email
                                    
                                </label>
                                <input name="Email" type="text" {...register('Email')} defaultValue="" className="w-full border rounded focus:outline-none p-1"  />
                                {/* {params.isEdit ? 
                                    <input name="Name" type="text" {...register('Name')} defaultValue={params.item.name} className="w-full border rounded focus:outline-none p-1"  /> : 
                                    <input name="Name" type="text" {...register('Name')} defaultValue="" className="w-full border rounded focus:outline-none p-1"  />}*/}
                                    
                                <span className="text-left items-start flex text-red">
                                    {errors.Email?.message}
                                </span> 

                                    
                            </div>
            
                            <div className="flex-grow w-full">
                                <label htmlFor="" className="text-sm font-bold text-gray block p-1">
                                    <i className="fa fa-lock"></i>  Password:
                                </label>
                                
                                <input name="Password" type="Password" {...register('Password')} defaultValue="" className="w-full border rounded focus:outline-none p-1"  />

                                <span className="text-left items-start flex text-red">
                                    {errors.Password?.message}
                                </span> 
                            </div>
            
                                
                            {/*footer*/}
                            <div className="flex items-center justify-end sm:justify-center p-6 border-solid border-gray-200 rounded-b">
                                <button
                                    className="rounded bg-brown text-white cursor-pointer hover:bg-brown-ullight font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Login
                                </button>
                                <button
                                    className="rounded text-white bg-gray cursor-pointer font-bold uppercase px-6 sm:py-2 py-2 text-sm outline-none hover:shadow-lg hover:bg-gray-dark focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={CloseForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )}

        
      </div>
    );
}
export default Login;