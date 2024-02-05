import { useState , useEffect } from "react";
import "./App.css";
import ReactLoading from 'react-loading';

function App() {


  const [Type, SetType] = useState("hot");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Next,setNext] = useState("begin");

  const ChooseType = (e) => {
    console.log(e.target.value);
    setData([]);
    setNext("");
    SetType(e.target.value);

  
  };


  const fetchData = async () => {
    setLoading(true)
    console.log("fetching data..." , Type,Next);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/fetch-and-store", {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Type,
          data: Next,
        }),
      });
         const thedata =[]
      const result = await response.json();
      
      result.children.children.forEach((item) => {
        thedata.push(item);
      });
      const RealData = result.children;
      const NextChildren= data.children || [];
      const mergedArray = Array.from(NextChildren).concat(thedata)
       setData({children:mergedArray,after:RealData.after});

  setNext(RealData.after)
  
    setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
   
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {

        setNext(data.after)
        
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
   
    fetchData();

  
  }, [Type]);

console.log(data.children)
  function getSubstring(inputString) {
    if (typeof inputString !== 'string') {
      throw new Error('Input must be a string');
    }
  
    if (inputString.length <= 200) {
      return inputString;
    } else {
      return inputString.substring(0, 200);
    }
  }

const GoToPost = (post)=> {
  
    console.log(post.data.permalink)
    const href = "https://www.reddit.com/" + post.data.permalink;
    window.location.href = href;
  
}
  return (
    <div className=" overflow-x-hidden ">
      <div className="w-full m-5 border-b-4">
        <h1 className="text-red-950 text-5xl m-2 font-extrabold">/r/WWE</h1>
      </div>

      <div className="  p-2 border-b-2 flex items-center justify-evenly overflow-x-hidden ">
        <div className="w-[10rem] border bg-red-950">
          <button
            onClick={ChooseType}
            value="hot"
            className="w-full p-5 font-medium text-white hover:bg-red-800 transition-colors duration-300"
          >
            Hot
          </button>
        </div>
        <div className="w-[10rem] border bg-red-950 ">
          <button
            onClick={ChooseType}
            value="new"
            className="w-full p-5 font-medium text-white hover:bg-red-800 transition-colors duration-300"
          >
            New
          </button>
        </div>
        <div className="w-[10rem] border bg-red-950">
          <button
            onClick={ChooseType}
            value="rising"
            className="w-full p-5 font-medium text-white hover:bg-red-800 transition-colors duration-300"
          >
            Rising
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 my-5 w-full overflow-x-hidden">


      {data.children && data.children.map((post, index) => 
        <div onClick={()=>GoToPost(post)}  key={index} className="w-1/2 transform overflow-x-hidden shadow-md border-t-8 rounded-md flex flex-col cursor-pointer hover:scale-125 hover:shadow-xl transition-colors duration-500">
          <div className="ml-3 py-2">
            <div>
              <h2 className="text-lg font-semibold">{post.data.title}</h2>
            </div>
            <div className="w-full py-2">
              <p className="break-words">{getSubstring(post.data.selftext) + '...'}</p>
            </div>
          </div>
        </div>
      )}
          
{loading && <div>
  <ReactLoading
      type={'spin'} // or other available types
      color={'#000'} // set your desired color
      height={120}    // set your desired height
      width={120} 
      className="h-20 w-20 md:h-30 md:w-30 lg:h-50 lg:w-50 xl:h-60 xl:w-60" // responsive height and width
    />
  
  </div>}


     
      </div>
     
    </div>
  );
}

export default App;
