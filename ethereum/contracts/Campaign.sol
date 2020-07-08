pragma solidity ^0.4.17;

contract CampaignFactory{
    
    address[] public deployedCampaign;
    
    function createCampaign(uint minimum) public {
        
        address newCampign = new Campaign(minimum, msg.sender);
        deployedCampaign.push(newCampign);
    }
    
    function getDeployedCampaign() public view returns (address[]){
        return deployedCampaign;
    }
}

contract Campaign {

    struct Request{

        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approval;
    }
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    function Campaign(uint minimum, address creator) public {
        
        manager = creator;
        minimumContribution = minimum;
    }
    function contribute() public payable {

        require(msg.value > minimumContribution);
   
        approvers[msg.sender] = true;
        approversCount++;
    }
    function createRequest(string des, uint val, address rec) public restricted {
        // memory and storage
        Request memory newReq = Request({
            
            description: des,
            value: val,
            recipient: rec,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newReq);
    }
    function approveRequest(uint index) public {
        
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approval[msg.sender]);
        
        request.approval[msg.sender] = true;
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint index) public {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
       
    }
    function getSummary() public view returns(uint, uint, uint, uint, address) {

        return(

            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }
    function getRequestsCount() public view returns (uint) {

        return requests.length;
    }
}