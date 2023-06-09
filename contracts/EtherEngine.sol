// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "./LilypadEventsUpgradeable.sol";
import "./LilypadCallerInterface.sol";

contract EtherEngine is LilypadCallerInterface {
    LilypadEventsUpgradeable public lilypad;
    uint256 public lilypadFee;

    mapping (uint => string) public jobs;

    event JobCompleted(uint jobId, string result);
    event JobFailed(uint jobId);

    constructor(address _lilypadAddress) {
        lilypad = LilypadEventsUpgradeable(_lilypadAddress);
        lilypadFee = lilypad.getLilypadFee();
    }

    function runJob(string memory _spec) public payable {
        require(msg.value >= lilypadFee, "Not enough to run Lilypad job");
        uint jobId = lilypad.runLilypadJob{value: lilypadFee}(address(this), _spec, uint8(LilypadResultType.CID));
        jobs[jobId] = _spec;
    }

    function lilypadFulfilled(address _from, uint _jobId, LilypadResultType _resultType, string calldata _result) external override {
        require(_from == address(lilypad), "Invalid caller");
        require(_resultType == LilypadResultType.CID, "Invalid result type");
        emit JobCompleted(_jobId, _result);
        delete jobs[_jobId];
    }

    function lilypadCancelled(address _from, uint _jobId, string calldata /* _errorMsg */) external override {
        require(_from == address(lilypad), "Invalid caller");
        emit JobFailed(_jobId);
        delete jobs[_jobId];
    }

}
