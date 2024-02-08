import { TailSpin } from 'react-loader-spinner'

export default function SpinnerLoading() {
    return (
        <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}