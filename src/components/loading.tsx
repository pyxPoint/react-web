import {Style} from 'react-style-tag';
const Loading = () => {
  return (
    <>
      <Style>{`
.loading {
  position: relative;
  width: 100px;
  perspective: 2000px;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 30px;
  height: 30px;
  content: "";
  border-radius: 4px;
  animation: jumping 0.5s infinite alternate;
  background:rgb(223, 211, 41);
}

.loading:before {
  left: 0;
}

.loading:after {
  right: 0;
  animation-delay: 0.15s;
}

@keyframes jumping {
  0% {
    transform: scale(1) translateY(0px) rotateX(0deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(1.2) translateY(-50px) rotateX(45deg);
    background:rgb(180, 158, 31);
    box-shadow: 0 50px 80px #000;
  }
}`}</Style>
      <div className="bg-white rounded-xl p-4 min-h-[90%]">
        <div className="w-full h-3/5 flex justify-center items-center">
          <div className="loading"></div>
        </div>
      </div>
    </>
  );
};
export default Loading;
