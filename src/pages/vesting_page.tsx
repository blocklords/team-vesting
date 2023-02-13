import { useEffect, useState } from "react"
import Countdown from "react-countdown";
import Web3 from "web3";
import { REACT_APP_DURATION, numberWithCommas, renderer, TOTAL_VESTING } from "../utils"

const VestingPage = (props: any) => {
  const { address, contract } = props;
  const [startTime, setStartTime] = useState<any>(0);
  const [totalReleased, setTotalReleased] = useState<any>(0);
  const [totalAvailable, setTotalAvailable] = useState<any>(0);
  const [showData, setShowData] = useState<any>(false);
  const [duration, setDuration] = useState<any>(0);
  const [isError, setIsError] = useState<any>(false);

  let start = (async () => {
    if (contract) {
      setIsError(false);

      console.log('contract', contract);
      const startTime = await contract.methods.startTime().call();
      setStartTime(startTime);
      if (address) {
        let userDuration = await contract.methods.getDuration().call({ from: address });
        setDuration(userDuration);
        console.log(userDuration, 'userDuration')

        if (userDuration === "0") {
          setIsError(true);
        } else {
          setIsError(false);
          let totalReleased = await contract.methods.getTotalReleased().call({ from: address });
          totalReleased = parseFloat(Web3.utils.fromWei(totalReleased, "ether")).toFixed(6);
          // console.log(totalReleased, 'totalReleased');
          setTotalReleased(totalReleased);
          let totalAvailable = await contract.methods.getAvailableAmount().call({ from: address });
          totalAvailable = parseFloat(Web3.utils.fromWei(totalAvailable, "ether")).toFixed(6);
          setTotalAvailable(totalAvailable);
          const balances = await contract.methods.balances(address).call()
          console.log(balances, 'balances');
          setShowData(true)
        }

      } else {
        setTotalAvailable(0);
        setTotalReleased(0);
      }
    }

  })

  useEffect(() => {
    start();
  }, [address, contract])

  // start();

  setInterval(async () => {
    start();
  }, 1000 * 60)



  const claim = async () => {
    const response = await contract.methods.withdraw().send({ from: address });
    if (response && response.status === true) {
      let totalReleased = await contract.methods.getTotalReleased().call({ from: address });
      totalReleased = parseFloat(Web3.utils.fromWei(totalReleased, "ether")).toFixed(6);
      setTotalReleased(totalReleased);

      let totalAvailable = await contract.methods.getAvailableAmount().call({ from: address });
      totalAvailable = parseFloat(Web3.utils.fromWei(totalAvailable, "ether")).toFixed(6);
      setTotalAvailable(totalAvailable);
    }
  }

  return (
    <div className="popup">
      {isError ? <div className="error error-text">You are not eligible for vesting.</div> : <div className="popup-inner">
        <h1>
          Team Token Vesting
        </h1>
        <div className="info-list" >
          <div className="info-list--item">
            <p>
              Total claimed
            </p>

            <p className="number">
              {(!showData) ? '???' : numberWithCommas(totalReleased)} CWS
            </p>
          </div>

          <div className="info-list--item">
            <p>
              Available to claim
            </p>

            <p className="number">
              {(!showData) ? '???' : numberWithCommas(totalAvailable)} CWS
            </p>
          </div>

          <div className="info-list--item">
            <p>
              Vesting ends on
            </p>

            <p className="number">
              {(!showData || !startTime) ? '???' : new Date(startTime * 1000 + Number(duration) * 1000).toLocaleString()}
            </p>
          </div>
        </div>
        <span className="spacer"></span>
        <button className={`claim-btn ${(address && showData && totalAvailable > 0) ? 'active' : 'inactive'}`} onClick={() => {
          if (address && totalAvailable > 0) {
            claim();
          }
        }}>
          Claim
        </button>
      </div>}
    </div>
  );
}
export default VestingPage;