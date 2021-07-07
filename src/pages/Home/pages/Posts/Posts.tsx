//@ts-ignore
import React, { useState, useEffect, useCallback, Fragment } from "react";
//@ts-ignore
import { Link, useParams } from 'react-router-dom';
//@ts-ignore
import { useForm } from "react-hook-form";
// import axiosPublicClient from "../../../../services/axios/axiosPublicClient";
import { isConstructorTypeNode } from "typescript";
import { toastError, toastSuccess } from "../../../../services/toastService";
import Swal from 'sweetalert2';
//@ts-ignore
import { useHistory } from "react-router-dom";
import { PATHS } from "../../../../constants/paths";
import axios from "axios";

type PostFormData = {
    userId: string,
    id: string,
    title: string,
    body: string
}

const Posts = () => {

  const history = useHistory();

  const [data, setData] = useState<PostFormData[]>([]);
  const [curPosts, setCurPosts] = useState<PostFormData[]>([]); 
  const [isLoading, setIsLoading]  = useState(false);
  const [sortType, setSortType] = useState("(NONE)");

  const getPostPage = () => {
    setIsLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        console.log(response)
        setData(response.data)
        setIsLoading(false)
        setCurPosts(response.data)
        toastSuccess("Load Successfully!");
    })
    .catch(error => {
        console.log(error)
    })
  }

  useEffect(() => {
      getPostPage();
  },[data.length]);

  const onDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure want to delete this item?',
      text: "You won't be able to revert this!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const newList = curPosts.filter((p: any) => {
          return p.id != id;
        });
    
        setCurPosts([...newList]);
      }
    })
  };

  const sortPosts = () => {
    if (sortType == "(NONE)"){
      setSortType("ASC");
      const sortedASC = curPosts.sort((a:any, b:any) => (a.title > b.title ? 1 : -1));
    }
    else if (sortType == "ASC"){
      setSortType("DES");
      const sortedDES = curPosts.sort((a:any, b:any) => (a.title < b.title ? 1 : -1));
    }
    else if (sortType == "DES"){
      setSortType("(NONE)");
      const sortedNone = curPosts.sort((a:any, b:any) => (a.id > b.id ? 1 : -1));
    }
  };


  const onChangeValueInputSearch = (event: any) => {
    const searchedList = data.filter((p: any) => {
      return p.title.includes(event.currentTarget.value);
    });

    setCurPosts([...searchedList]);
  }

  const changeOrderTitle = () => {
    data.sort(function(a:any, b:any) {
      return a.title - b.title;
    });
    console.log(data)
  }

  const onView = (id: string) => {
    history.push(PATHS.POST + "/" + id)
  }

  return (
      
      <div className="bg-white sm:w-10/12 w-11/12 ml-4 sm:ml-36 mt-3 mb-16 sm:mt-7 rounded">
        {isLoading == true ? 
        ( 
          <button type="button" className="bg-green ..." disabled>
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            </svg>
            Loading
          </button>
        ) : 
        (
            <div>
                <div className="w-full flex  border-b-2 border-cyan-light">
                <div className="flex-grow sm:w-1/12 w-1/3 items-start sm:p-5 p-3 text-lg font-bold ">
                    Posts
                </div>
                <div className="flex-grow sm:w-10/12 w-1/3">
                </div>
                
                </div>
                
                <div className="w-full flex flex-col sm:flex-row">
                <div className="sm:w-5/12 w-full items-start sm:p-2 p-2 text-md">
                    <input
                    type="text"
                    className="input  border-2  rounded-md p-1 sm:mt-2 float-left w-full focus:outline-none "
                    placeholder="Filter by Title or Body"
                    onChange={(e) => { onChangeValueInputSearch(e) }}
                    />
                    <div className="ml-2 text-gray">
                    Filter by <span className="font-bold">Title</span> or <span className="font-bold">Body</span>
                    </div>
                </div>
                </div>

                <div className="flex flex-col p-3 w-80 sm:w-full overflow-x-auto">
                    <table className='border-collapse w-96 border sm:w-full border-blue -mt-3 p-3 justify-center '>
                        <thead className='bg-blue-light'>
                        <tr>
                            <th className="border border-blue sm:w-1/12 p-2 text-white">ID</th>
                            <th className="border border-blue sm:w-10/12 p-2 text-white" onClick={sortPosts}>Title - Sort {sortType}</th>
                            <th className="border border-blue sm:w-1/12 p-2 text-white">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        {curPosts.map((item: any) => (
                            
                            <tr className="hover:bg-gray-light" key={item.id}>
                                <td className="border border-blue-light p-3 text-center">{item.id}</td>
                                <td className="border border-blue-light p-3">{item.title}</td>
                                <td className="border border-blue-light p-3 text-center">
                                    {/* <button className="text-2xl p-1 outline-none focus:outline-none" onClick={() => { onUpdate(item.id, item) }}>
                                    <i className="fa fa-pencil-square-o"></i>
                                    </button>*/}
                                    
                                    <button className="text-xl px-1 m-1 bg-blue outline-none text-white rounded focus:outline-none" onClick={() => { onView(item.id) }}>
                                        <i className="fa fa-eye"></i>
                                    </button>

                                    <button className="text-xl px-1 m-1 bg-red text-white rounded outline-none focus:outline-none"  onClick={() => { onDelete(item.id) }}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>

                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
  );
}
export default Posts;