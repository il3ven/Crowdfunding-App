pragma solidity >=0.6.0 <0.7.0;

contract Campaign {
    address private owner; //address of owner who created the campaign
    uint public deadline;
    uint public goal;
    uint public totalAmountContributed; //totalAmountContributed must be greater than goal before dealine then only funds will be released
    
    constructor(uint _numberOfSeconds, uint _goal) public {
        owner = msg.sender;
        deadline = _numberOfSeconds * (1 seconds) + now;
        goal = _goal;
        totalAmountContributed = 0;
    }
    
    //donate money to the campaign
    function pledge() public payable {
        require((now * 1 seconds) < deadline, "Campaign has ended");
        require(msg.value > 0, "Amount to be pledged must be greater than zero");
        
        totalAmountContributed += msg.value;
    }
    
    //number of seconds left until deadline
    function getTimeLeft() public view returns (uint){
        if((deadline) > (now * 1 seconds)) {
            return (deadline) - (now * 1 seconds);
        }
        else
            return 0;
    }
    
    
    function claimFunds() public payable{
        require(((deadline) - (now * 1 seconds)) > 0, "Campaign has not ended yet"); //check if campaign has not ended
        require(msg.sender == owner, "Only owner can claim the funds"); //only owner can claim funds
        require(address(this).balance >= goal, "Not enough money collected");
        
        msg.sender.transfer(address(this).balance);
    }
}