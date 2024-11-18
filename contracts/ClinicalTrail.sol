pragma solidity 0.8.14;
contract ClinicalTrails{
    constructor(address fda){
        FDA_authority=fda;
    }
    struct CTitem{
        address producer;
        uint ctitem_no;
        string ctitem_hash;
        bool Application_stage_completed;
        bool Appilcation_Approved; 
        bool enrollment_completed;  
    }
    struct ClinicalTrailRequest{
        uint ctitem_number;
        uint starttime;
        uint endtime;
        uint noofpaits;
        uint max_age;
        uint no_of_paits;
        string ct_hash;
        string sop_hash;
        string pi_cv_hash;
        bool CT_approved;
        uint no_of_pait;
    }
mapping(uint=>address) public ct_to_physican;
    struct patient{
        address patient_Address;
        uint ct_number;
        string  medical_report_hash;
        bool result;
    }
    address [] patientaddress;
    mapping (uint => patient)patients;
    address public physician;
    mapping (uint => ClinicalTrailRequest) public Clinical_Trails;
    address [] sponsors;
    address public FDA_authority;
    uint clinical_item_number=0;
    mapping (uint => CTitem) public Clinical_Trail_Products;

    uint public Application_fees=200;
    bool [] pait_result;
    function submit_Application(string memory hash,bool application_stage) public payable 
    {
        require(msg.value==Application_fees,"The amount is not efficient to submit the application");
        sponsors.push(msg.sender);
        payable(FDA_authority).transfer(msg.value);
        clinical_item_number+=1;
        Clinical_Trail_Products[clinical_item_number].producer=msg.sender;
        Clinical_Trail_Products[clinical_item_number].ctitem_no=clinical_item_number;
        Clinical_Trail_Products[clinical_item_number].ctitem_hash=hash;
        Clinical_Trail_Products[clinical_item_number].Application_stage_completed=application_stage;
        Clinical_Trail_Products[clinical_item_number].Appilcation_Approved=false;
    }
    function approve_application(uint application_id,bool details_correct) public {
        require(msg.sender==FDA_authority,"Only FDA authority ");
        if(details_correct){
            Clinical_Trail_Products[application_id].Appilcation_Approved=true;
        }
        else{
            Clinical_Trail_Products[application_id].Appilcation_Approved=false;
        }

    }
    function valid_sponsor(address j) public view returns(bool)
    {
        uint flag=0;
        for(uint i=0;i<sponsors.length;i++)
        {
            if(sponsors[i]==j)
            {
                flag=1;
                return true;
            }
        }
        if (flag==0)
        {
            return false;
        }
    }
    function clinical_trail_Request(uint CT_number,uint start_time,uint end_time,uint noofpaitents,uint max_age,string memory CTProtocolHash, string memory SOPHash, string memory PI_CVHash) public {
        require(valid_sponsor(msg.sender),"You are not a valid sponsor you are not allowed ro make Clinical Trail Request");
    require(Clinical_Trail_Products[CT_number].Appilcation_Approved==true,"Application Not Approved yet");
    Clinical_Trails[CT_number].ctitem_number=CT_number;
    Clinical_Trails[CT_number].starttime=start_time;
    Clinical_Trails[CT_number].endtime=end_time;
    Clinical_Trails[CT_number].noofpaits=noofpaitents;
    Clinical_Trails[CT_number].max_age=max_age;
    Clinical_Trails[CT_number].no_of_paits=noofpaitents;
     Clinical_Trails[CT_number].ct_hash=CTProtocolHash;
    Clinical_Trails[CT_number].sop_hash=SOPHash;
    Clinical_Trails[CT_number].pi_cv_hash=PI_CVHash;
    Clinical_Trails[CT_number].CT_approved=false;
    }
    function approve_CT_request(uint CT_number) public {
       require(msg.sender==FDA_authority,"Only FDA authority ");
       Clinical_Trails[CT_number].CT_approved=true;
    }
    function assign_physician(uint cid,address phy) public {
        require(valid_sponsor(msg.sender)==true,"Not allowed to assign physician");
        ct_to_physican[cid]=phy;
        physician=phy;
    }
    function enroll_paitient(address padd,uint pait_id,uint ct_number,uint age,bool consent_completed,bool medical_remark,string memory medical_report_hash) public 
    {
        require(msg.sender==physician,"only physician can enroll patient");
        require(consent_completed,"Patient needs to complete consent to enroll");
        require(age<Clinical_Trails[ct_number].max_age);
        require(medical_remark==false,"the patient must not have any medical remark");
        require(Clinical_Trails[ct_number].no_of_pait<Clinical_Trails[ct_number].noofpaits);
        patients[pait_id].patient_Address=padd;
        patients[pait_id].ct_number=ct_number;
        Clinical_Trails[ct_number].no_of_pait+=1;
        patients[pait_id].medical_report_hash=medical_report_hash;
    }
    function enroll_completed(uint ct_number) public {
        require(msg.sender==physician);
        Clinical_Trail_Products[ct_number].enrollment_completed=true;
    }
    function enter_result(uint pait_id,bool res) public {
        patients[pait_id].result=res;
        pait_result.push(res);
    }
    function declare_trail_result(uint ct_number) public view returns(bool) {
        uint p;
        for(uint i=0;i<pait_result.length;i++)
        {
            if(pait_result[i]==true)
            {
                p=p+1;
            }
        }
        if (p>((7*Clinical_Trails[ct_number].noofpaits)/10)){
            return true;
        }  
        else {
            return false;
        } }
}