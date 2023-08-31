import axios from "axios";

export const addCategory = async (
  authToken: string,
  value: { category: string }
) => {
  return await axios.post(
    import.meta.env.VITE_BACKENDPOINT + "/category",
    value,
    {
      headers: { authToken },
    }
  );
};
export const editCategory = async (
  authToken: string,
  value: { _id: string; category: string }
) => {
  return await axios.put(
    import.meta.env.VITE_BACKENDPOINT + "/category",
    value,
    {
      headers: { authToken },
    }
  );
};

export const listCategory = async () => {
  return await axios.get(import.meta.env.VITE_BACKENDPOINT + "/category");
};

export const removeCategory = async (authToken: string, _id: React.Key) => {
  return await axios.delete(
    import.meta.env.VITE_BACKENDPOINT + "/category/" + _id,
    {
      headers: { authToken },
    }
  );
};

export const createProduct = async (authToken: string, value: any) => {
  return await axios.post(
    import.meta.env.VITE_BACKENDPOINT + "/product",
    value,
    {
      headers: {
        authToken: authToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const listProduct = async () =>
  await axios.get(import.meta.env.VITE_BACKENDPOINT + "/product");

export const readProduct = async (id: string) =>
  await axios.get(import.meta.env.VITE_BACKENDPOINT + "/product/"+ id);

export const removeProduct = async (authToken: string, _id: React.Key) => {
  return await axios.delete(
    import.meta.env.VITE_BACKENDPOINT + "/product/" + _id,
    {
      headers: { authToken },
    }
  );
};

export const updateProduct = async (authToken: string, value: any,id:string) => {
  return await axios.put(
    import.meta.env.VITE_BACKENDPOINT + "/product/"+id,
    value,
    {
      headers: {
        authToken: authToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};


export const oders =async(order:any)=>{
  return await axios.post(
    import.meta.env.VITE_BACKENDPOINT + "/oder/" , order
  );
}
