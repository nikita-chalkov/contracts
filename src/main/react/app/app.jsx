import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
import $ from 'jquery';
import 'bootstrap-datepicker';

import {Table} from './lib/table/table.jsx';
import {Tr} from './lib/table/tr.jsx';
import {Td} from './lib/table/td.jsx';
import {Th} from './lib/table/th.jsx';
import {Button} from './lib/buttons/button.jsx';
import {BtnGroup} from './lib/buttons/btngroup.jsx';
import {Container} from './lib/grid/container.jsx';
import {Row} from './lib/grid/row.jsx';
import {Col} from './lib/grid/col.jsx';
import {Input} from './lib/forms/input.jsx';
import {Textarea} from './lib/forms/textarea.jsx';
import {Select} from './lib/forms/select.jsx';


class App extends React.Component {
    constructor(props){
        super(props);
        var date = this.dateConvert(new Date());
        this.emptyContract = {"id":null,"insuranceSum":null,"dateStart":null,"dateEnd":null,"buildingType":{"id":null,"name":null},"yearBuild":null,"area":null,"dateCalc":null,"bonus":null,"contractNumber":null,"dateConclusion":date,"insurant":{"id":null,"firstName":null,"lastName":null,"thirdName":null,"birthDate":null,"pasportNumber":null,"pasportSeries":null},"country":null,"index":null,"region":null,"district":null,"city":null,"street":null,"house":null,"housing":null,"structure":null,"apartment":null,"contractComment":null};
        this.selectedContract = null;
        this.selectedInsurant = null;
        this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
        this.state = {
            contracts: [],
            contractSelected: null,
            buildingTypes: [],
            insurantList: [],
            contractEdit: Object.assign({}, this.emptyContract)
        };
        fetch(contextPath+'/api/all',{method: 'POST'})
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            this.setState ({contracts: data});
        })
        .catch(error => console.log(error));
        fetch(contextPath+'/api/buildingTypes',{method: 'POST'})
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            this.setState ({buildingTypes: data});
        })
        .catch(error => console.log(error));

    }
      _handleDoubleClickItem(event) {
        console.log('double click');
      }
    dateConvert(date){
        var dt = new Date(date);
        return dt.getFullYear()+'-'+((dt.getMonth()+1)>9?(dt.getMonth()+1):'0'+(dt.getMonth()+1))+'-'+(dt.getDate()>9?dt.getDate():'0'+dt.getDate());
    }
    componentDidMount(){
        document.getElementById('progress-line').style.cssText = "width: 100%";
        setTimeout(()=>{document.getElementById('wrapper').classList.remove('preload');},1650);
    }
    onClickInsurant(insurant){
        if(this.selectedInsurant==null||this.selectedInsurant!=insurant){
            if(document.getElementsByClassName('active').length>0){
                document.getElementsByClassName('active')[0].classList.remove('active');
            }
            this.selectedInsurant=insurant;
            document.getElementById('tr-insurant-'+insurant.id).classList.add('active');
        }else{
            this.selectedInsurant=null;
            document.getElementById('tr-insurant-'+insurant.id).classList.remove('active');
        }
    }
    onClickChoseSelectedInsurant(){
        if(this.selectedInsurant!=null){
            var contractEdit = this.state.contractEdit;
            contractEdit.insurant = this.selectedInsurant;
            this.setState({contractEdit:contractEdit});
        }
    }
    onClickSearchInsurant(){
        fetch(contextPath+'/api/insurantSearch',{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                lastName: document.getElementById('insurantChoseLastName').value,
                firstName: document.getElementById('insurantChoseFirstName').value,
                thirdName: document.getElementById('insurantChoseThirdName').value
            })
        })
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            this.setState ({insurantList: data});
        })
        .catch(error => console.log(error));
    }
    onClickChoseInsurant(){
        this.changeContainer('insurantChose');
    }
    onClickEditInsurant(){
        if(this.state.contractEdit.insurant.id!=null){
            this.changeContainer('insurant');
        }
    }
    onClickToNewContract(){
        this.changeContainer('contract');
    }
    onClickNewInsurant(){
        this.changeContainer('insurantCreate');
    }
    onClickCreateInsurant(){
        var arr = [].slice.call(document.getElementsByClassName('incorrect'));
        arr.forEach((element)=>{element.classList.remove('incorrect')});
        var re = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        var bd = document.getElementById('insurantCreateBirthDate').value.match(re);
        console.log(bd);
        fetch(contextPath+'/api/insurantCreate',{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                id: this.state.contractEdit.insurant.id,
                lastName: document.getElementById('insurantCreateLastName').value,
                firstName: document.getElementById('insurantCreateFirstName').value,
                thirdName: document.getElementById('insurantCreateThirdName').value,
                birthDate: bd?document.getElementById('insurantCreateBirthDate').value:''
            })
        })
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            if(data.id!=null&&data.lastName!=null&&data.firstName!=null&&data.thirdName!=null){
                var contractEdit = this.state.contractEdit;
                contractEdit.insurant = data;
                this.setState ({insurantList: [data],contractEdit:contractEdit});
                this.changeContainer('contract');
            }else{
                data.map((error)=>{
                    document.getElementById('insurantCreate'+error.code).classList.add('incorrect');
                });
            }
        })
        .catch(error => console.log(error));
    }
    onClickEditInsurantSave(){
        var arr = [].slice.call(document.getElementsByClassName('incorrect'));
        arr.forEach((element)=>{element.classList.remove('incorrect')});
        var pn = document.getElementById('insurantEditPasportNumber').value.match(/^[0-9]{6}$/);
        var ps = document.getElementById('insurantEditPasportSeries').value.match(/^[0-9]{4}$/);
        fetch(contextPath+'/api/insurantCreate',{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                id: this.state.contractEdit.insurant.id,
                lastName: document.getElementById('insurantEditLastName').value,
                firstName: document.getElementById('insurantEditFirstName').value,
                thirdName: document.getElementById('insurantEditThirdName').value,
                birthDate: document.getElementById('insurantEditBirthDate').value,
                pasportNumber: pn?document.getElementById('insurantEditPasportNumber').value:'',
                pasportSeries: ps?document.getElementById('insurantEditPasportSeries').value:''
            })
        })
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            if(data.id!=null&&data.lastName!=null&&data.firstName!=null&&data.thirdName!=null){
                var contractEdit = this.state.contractEdit;
                contractEdit.insurant = data;
                this.setState ({insurantList: [data],contractEdit:contractEdit});
                this.changeContainer('contract');
            }else{
                data.map((error)=>{
                    document.getElementById('insurantEdit'+error.code).classList.add('incorrect');
                });
            }
        })
        .catch(error => console.log(error));
    }
    onClickContract(item){
        if(this.selectedContract==null||this.selectedContract!=item){
            if(document.getElementsByClassName('active').length>0){
                document.getElementsByClassName('active')[0].classList.remove('active');
            }
            this.selectedContract=item;
            document.getElementById('tr-contract-'+item.id).classList.add('active');
        }else{
            this.selectedContract = null;
            document.getElementById('tr-contract-'+item.id).classList.remove('active');
        }
    }
    onClickEditContract(){
        if(this.selectedContract!=null){
            this.setState({contractEdit: Object.assign({}, this.selectedContract)});
            this.changeContainer('contract');
            this.onStartDatePicker();
        }
    }
    onClickCreateContract(){
        this.setState({contractEdit: Object.assign({}, this.emptyContract)});
        this.changeContainer('contract');
        this.onStartDatePicker();
    }
    onStartDatePicker(){
        $('#contractDateStart').datepicker({format: 'yyyy-mm-dd', language: 'ru', startDate: '+0d'});
        $('#contractDateEnd').datepicker({format: 'yyyy-mm-dd', language: 'ru', startDate: '+1d'});
        $('#insurantCreateBirthDate').datepicker({format: 'yyyy-mm-dd', language: 'ru'});
        $('#insurantEditBirthDate').datepicker({format: 'yyyy-mm-dd', language: 'ru'});
        $('#contractYearBuild').datepicker({format: 'yyyy', language: 'ru', endDate: '+0y', minViewMode: 'years',autoclose: true});
    }
    onDestroyDatePicker(){
        $('#contractDateStart').datepicker('destroy');
        $('#contractDateEnd').datepicker('destroy');
        $('#insurantCreateBirthDate').datepicker('destroy');
        $('#insurantEditBirthDate').datepicker('destroy');
        $('#contractYearBuild').datepicker('destroy');
    }
    clickToMainList(){
        this.onDestroyDatePicker();
        this.changeContainer('contractsListPage');
    }
    clickCalculate(){
        var arr = [].slice.call(document.getElementsByClassName('incorrect'));
        arr.forEach((element)=>{element.classList.remove('incorrect')});
        var is = document.getElementById('contractInsuranceSum').value.match(/^[0-9]+$/);
        var area = document.getElementById('contractArea').value.match(/^([0-9]+[.,]?[0-9]?)$/);
        var dateMore = new Date(document.getElementById('contractDateStart').value)<new Date(document.getElementById('contractDateEnd').value);
        fetch(contextPath+'/api/calculate',{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                insuranceSum: is?document.getElementById('contractInsuranceSum').value:'',
                dateStart: dateMore?document.getElementById('contractDateStart').value:'',
                dateEnd: dateMore?document.getElementById('contractDateEnd').value:'',
                buildingType: {id: document.getElementById('contractBuildingType').value},
                yearBuild: document.getElementById('contractYearBuild').value,
                area: area?document.getElementById('contractArea').value.replace(',','.'):'',
                calc: 0
            })
        })
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            if(!Array.isArray(data)){
                var contractEdit = Object.assign({}, this.state.contractEdit);
                contractEdit.bonus = data;
                contractEdit.dateCalc = this.dateConvert(new Date());
                this.setState ({contractEdit: Object.assign({}, contractEdit)});
                console.log(this.state.contractEdit);
            }else{
                data.map((error)=>{
                    document.getElementById('contract'+error.code).classList.add('incorrect');
                });
            }
        })
        .catch(error => console.log(error));

    }
    clickSaveNewContract(){
        var arr = [].slice.call(document.getElementsByClassName('incorrect'));
        arr.forEach((element)=>{element.classList.remove('incorrect')});
        var is = document.getElementById('contractInsuranceSum').value.match(/^[0-9]+$/);
        var cn = document.getElementById('contractContractNumber').value.match(/^[0-9]{6}$/);
        var pn = document.getElementById('contractInsurantPasportNumber').value.match(/^[0-9]{6}$/);
        var ps = document.getElementById('contractInsurantPasportSeries').value.match(/^[0-9]{4}$/);
        var hs = document.getElementById('contractHouse').value.match(/^[0-9]+$/);
        var ap = document.getElementById('contractApartment').value.match(/^[0-9]+$/);
        var area = document.getElementById('contractArea').value.match(/^([0-9]+[.,]?[0-9]?)$/);
        var dateMore = new Date(document.getElementById('contractDateStart').value)<new Date(document.getElementById('contractDateEnd').value);

        fetch(contextPath+'/api/contractCreate',{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                id: this.state.contractEdit.id,
                insuranceSum: is?document.getElementById('contractInsuranceSum').value:'',
                dateStart: dateMore?document.getElementById('contractDateStart').value:'',
                dateEnd: dateMore?document.getElementById('contractDateEnd').value:'',
                buildingType: {id: document.getElementById('contractBuildingType').value},
                yearBuild: document.getElementById('contractYearBuild').value,
                area: area?document.getElementById('contractArea').value.replace(',','.'):'',
                dateCalc: document.getElementById('contractDateCalc').value,
                bonus: document.getElementById('contractBonus').value,
                contractNumber: cn?document.getElementById('contractContractNumber').value:'',
                dateConclusion: document.getElementById('contractDateConclusion').value,
                insurant: {
                    id: this.state.contractEdit.insurant.id,
                    lastName: this.state.contractEdit.insurant.lastName,
                    firstName: this.state.contractEdit.insurant.firstName,
                    thirdName: this.state.contractEdit.insurant.thirdName,
                    birthDate: document.getElementById('contractInsurantBirthDate').value,
                    pasportNumber: pn?document.getElementById('contractInsurantPasportNumber').value:'',
                    pasportSeries: ps?document.getElementById('contractInsurantPasportSeries').value:''
                },
                country: document.getElementById('contractCountry').value,
                index: document.getElementById('contractIndex').value,
                region: document.getElementById('contractRegion').value,
                district: document.getElementById('contractDistrict').value,
                city: document.getElementById('contractCity').value,
                street: document.getElementById('contractStreet').value,
                house: hs?document.getElementById('contractHouse').value:'',
                housing: document.getElementById('contractHousing').value,
                structure: document.getElementById('contractStructure').value,
                apartment: ap?document.getElementById('contractApartment').value:'',
                contractComment: document.getElementById('contractContractComment').value
            })
        })
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            //console.log(data);
            if(!Array.isArray(data)){
                console.log(this.state.contracts);
                var paste = true;
                var newContracts = [];
                this.state.contracts.forEach((contract)=>{
                    if(contract.id==data.id){
                        paste = false;
                        newContracts.push(data);
                    }
                    else newContracts.push(contract);
                });

                if(paste)newContracts.push(data);
                console.log(newContracts);
                this.setState({contracts: newContracts});
            }else{
                data.map((error)=>{
                    document.getElementById('contract'+error.code).classList.add('incorrect');
                });
            }
        })
        .catch(error => console.log(error));
    }

    handleDoubleClick(item) {
        this.selectedContract=Object.assign({}, item);
        this.setState({contractEdit: Object.assign({}, item)});
        this.changeContainer('contract');
        this.onStartDatePicker();
    }
    changeContainer(id){
        document.getElementsByClassName('container show')[0].classList.remove('show');
        document.getElementById(id).classList.add('show');
    }
    render() {
        return <div>
            <Container id={'contractsListPage'} addClass={'show'}>
                <BtnGroup classAdd={'mb-2'}>
                    <Button onClick={() => this.onClickCreateContract()} classAdd={'btn-sm'}>Создать договор</Button>
                    <Button onClick={() => this.onClickEditContract()} classAdd={'btn-sm'}>Открыть договор</Button>
                </BtnGroup>
                <Table tableId={'tableMain'} thead={
                    <Tr onClick={() => {}} onDoubleClick={() => {}}>
                        <Th>Сериня-Номер</Th>
                        <Th>Дата заключения</Th>
                        <Th>Страхователь</Th>
                        <Th>Премия</Th>
                        <Th>Срок действия</Th>
                    </Tr>
                } tbody={
                    this.state.contracts.map((contract)=>{
                        return <Tr key={contract.id} trId={'tr-contract-'+contract.id} onDoubleClick={()=>this.handleDoubleClick(contract)} onClick={() => this.onClickContract(contract)}>
                            <Td>{contract.contractNumber}</Td>
                            <Td>{contract.dateConclusion?this.dateConvert(contract.dateConclusion):''}</Td>
                            <Td>{contract.insurant.lastName+' '+contract.insurant.firstName+' '+contract.insurant.thirdName}</Td>
                            <Td>{contract.bonus}</Td>
                            <Td>{contract.dateEnd?this.dateConvert(contract.dateEnd):''}</Td>
                        </Tr>;
                    })
                }
                ></Table>
            </Container>



            <Container id={'insurantChose'}>
                <Row>
                    <Col><h3>Форма поиска клиента</h3></Col>
                </Row>
                <Row>
                    <Col>ФИО</Col>
                    <Col><Input type={'text'} id={'insurantChoseLastName'} value={''}/></Col>
                    <Col><Input type={'text'} id={'insurantChoseFirstName'} value={''}/></Col>
                    <Col><Input type={'text'} id={'insurantChoseThirdName'} value={''}/></Col>
                    <Col><Button onClick={() => this.onClickSearchInsurant()} classAdd={'btn-sm'}><i className="fas fa-search"></i></Button></Col>
                </Row>
                <Row>
                    <Col>
                        <Table tableId={'tableInsurants'} thead={
                            <Tr onClick={() => {}}>
                                <Th>ФИО</Th>
                                <Th>Дата рождения</Th>
                                <Th>Паспортные данные</Th>
                            </Tr>
                        } tbody={
                            this.state.insurantList.map((insurant)=>{
                                return <Tr key={insurant.id} trId={'tr-insurant-'+insurant.id} onClick={() => this.onClickInsurant(insurant)}>
                                    <Td>{insurant.lastName+' '+insurant.firstName+' '+insurant.thirdName}</Td>
                                    <Td>{insurant.birthDate?this.dateConvert(insurant.birthDate):''}</Td>
                                    <Td>{insurant.pasportNumber+' '+insurant.pasportSeries}</Td>
                                </Tr>;
                            })
                        }
                        ></Table>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Button onClick={() => this.onClickChoseSelectedInsurant()} classAdd={'btn-sm'}>Выбрать</Button></Col>
                    <Col><Button onClick={() => this.onClickNewInsurant()} classAdd={'btn-sm'}>Новый</Button></Col>
                    <Col><Button onClick={() => this.onClickToNewContract()} classAdd={'btn-sm'}>Закрыть</Button></Col>
                    <Col></Col>
                </Row>
            </Container>



            <Container id={'insurantCreate'}>
                <Row>
                    <Col><h3>Форма регистрации клиента</h3></Col>
                </Row>
                <Row>
                    <Col>ФИО</Col>
                    <Col><Input type={'text'} id={'insurantCreateLastName'} value={''}/></Col>
                    <Col><Input type={'text'} id={'insurantCreateFirstName'} value={''}/></Col>
                    <Col><Input type={'text'} id={'insurantCreateThirdName'} value={''}/></Col>
                </Row>
                <Row>
                    <Col>Дата рождения</Col>
                    <Col><Input type={'text'} id={'insurantCreateBirthDate'} value={''}/></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Button onClick={() => this.onClickCreateInsurant()} classAdd={'btn-sm'}>Сохранить</Button></Col>
                    <Col><Button onClick={() => this.onClickToNewContract()} classAdd={'btn-sm'}>Закрыть</Button></Col>
                    <Col></Col>
                </Row>
            </Container>



            <Container id={'insurant'}>
                <Row>
                    <Col><h3>Форма редактирования клиента</h3></Col>
                </Row>
                <Row>
                    <Col>ФИО</Col>
                    <Col><Input type={'text'} id={'insurantEditLastName'} value={this.state.contractEdit.insurant.lastName}/></Col>
                    <Col><Input type={'text'} id={'insurantEditFirstName'} value={this.state.contractEdit.insurant.firstName}/></Col>
                    <Col><Input type={'text'} id={'insurantEditThirdName'} value={this.state.contractEdit.insurant.thirdName}/></Col>
                </Row>
                <Row>
                    <Col>Дата рождения</Col>
                    <Col><Input type={'text'} id={'insurantEditBirthDate'} value={this.state.contractEdit.insurant.birthDate?this.dateConvert(this.state.contractEdit.insurant.birthDate):''}/></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>Паспорт серия</Col>
                    <Col><Input type={'text'} maxLength={'6'} id={'insurantEditPasportNumber'} value={this.state.contractEdit.insurant.pasportNumber}/></Col>
                    <Col>№</Col>
                    <Col><Input type={'text'} maxLength={'4'} id={'insurantEditPasportSeries'} value={this.state.contractEdit.insurant.pasportSeries}/></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Button onClick={() => this.onClickEditInsurantSave()} classAdd={'btn-sm'}>Сохранить</Button></Col>
                    <Col><Button onClick={() => this.onClickToNewContract()} classAdd={'btn-sm'}>Закрыть</Button></Col>
                    <Col></Col>
                </Row>
            </Container>



            <Container id={'contract'}>
                <Row>
                    <Col><h3>Расчёт</h3></Col>
                </Row>
                <Row>
                    <Col>Страховая сумма</Col>
                    <Col><Input type={'text'} id={'contractInsuranceSum'} value={this.state.contractEdit.insuranceSum}/></Col>
                    <Col>Срок действия</Col>
                    <Col><div><Input placeHolder={'с '} type={'text'} id={'contractDateStart'}
                        value={this.state.contractEdit.dateStart?this.dateConvert(this.state.contractEdit.dateStart):''}/></div></Col>
                    <Col><Input placeHolder={'по '} type={'text'} id={'contractDateEnd'}
                        value={this.state.contractEdit.dateEnd?this.dateConvert(this.state.contractEdit.dateEnd):''}/></Col>
                </Row>
                <Row>
                    <Col>Тип недвижимости</Col>
                    <Col><Select id={'contractBuildingType'} options={this.state.buildingTypes} value={this.state.contractEdit.buildingType.id?this.state.contractEdit.buildingType.id:''}/></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>Год постройки</Col>
                    <Col><Input type={'text'} id={'contractYearBuild'} value={this.state.contractEdit.yearBuild}/></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>Площадь, кв.м.</Col>
                    <Col><Input type={'text'} id={'contractArea'} value={this.state.contractEdit.area}/></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col><Button onClick={() => this.clickCalculate()} classAdd={'btn-sm'}>Рассчитать</Button></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>Дата расчета</Col>
                    <Col><Input type={'text'} id={'contractDateCalc'} readOnly={true}
                        value={this.state.contractEdit.dateCalc?this.dateConvert(this.state.contractEdit.dateCalc):''}/></Col>
                    <Col></Col>
                    <Col>Премия</Col>
                    <Col><Input type={'text'} id={'contractBonus'} readOnly={true} value={this.state.contractEdit.bonus}/></Col>
                </Row>
                <Row>
                    <Col><h3>Оформление</h3></Col>
                </Row>
                <Row>
                    <Col>№ договора</Col>
                    <Col><Input type={'text'} id={'contractContractNumber'} maxLength={'6'} value={this.state.contractEdit.contractNumber}/></Col>
                    <Col>Дата заключения</Col>
                    <Col><Input type={'text'} id={'contractDateConclusion'} readOnly={true}
                        value={this.state.contractEdit.dateConclusion?this.dateConvert(this.state.contractEdit.dateConclusion):''}/></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col><h3>Страхователь</h3></Col>
                </Row>
                <Row>
                    <Col cols={'auto'}><Button onClick={() => this.onClickChoseInsurant()} classAdd={'btn-sm'}>Выбрать</Button></Col>
                    <Col cols={'auto'}>ФИО</Col>
                    <Col><Input type={'text'} id={'contractInsurant'} readOnly={true} value={this.state.contractEdit.insurant.id?(this.state.contractEdit.insurant.lastName+' '+this.state.contractEdit.insurant.firstName+' '+this.state.contractEdit.insurant.thirdName):''}/></Col>
                    <Col cols={'auto'}><Button onClick={() => this.onClickEditInsurant()} classAdd={'btn-sm'}>Изменить</Button></Col>
                </Row>
                <Row>
                    <Col>Дата рождения	</Col>
                    <Col><Input type={'text'} id={'contractInsurantBirthDate'}
                        value={this.state.contractEdit.insurant.birthDate?this.dateConvert(this.state.contractEdit.insurant.birthDate):''}/></Col>
                    <Col>Паспорт серия</Col>
                    <Col><Input type={'text'} maxLength={'6'} id={'contractInsurantPasportNumber'} value={this.state.contractEdit.insurant.pasportNumber}/></Col>
                    <Col><Input type={'text'} maxLength={'4'} placeHolder={'№'} id={'contractInsurantPasportSeries'} value={this.state.contractEdit.insurant.pasportSeries}/></Col>
                </Row>
                <Row>
                    <Col><h3>Адрес недвижимости</h3></Col>
                </Row>
                <Row>
                    <Col cols={'2'}><Input type={'text'} id={'contractCountry'} value={this.state.contractEdit.country}/>государство</Col>
                    <Col cols={'2'}><Input type={'text'} id={'contractIndex'} value={this.state.contractEdit.index}/>индекс</Col>
                    <Col cols={'4'}><Input type={'text'} id={'contractRegion'} value={this.state.contractEdit.region}/>республика, край, область	</Col>
                    <Col cols={'4'}><Input type={'text'} id={'contractDistrict'} value={this.state.contractEdit.district}/>район</Col>
                </Row>
                <Row>
                    <Col cols={'3'}><Input type={'text'} id={'contractCity'} value={this.state.contractEdit.city}/>населённый пункт</Col>
                    <Col cols={'5'}><Input type={'text'} id={'contractStreet'} value={this.state.contractEdit.street}/>улица</Col>
                    <Col><Input type={'text'} id={'contractHouse'} value={this.state.contractEdit.house}/>дом</Col>
                    <Col><Input type={'text'} id={'contractHousing'} value={this.state.contractEdit.housing}/>корпус</Col>
                    <Col><Input type={'text'} id={'contractStructure'} value={this.state.contractEdit.structure}/>строение</Col>
                    <Col><Input type={'text'} id={'contractApartment'} value={this.state.contractEdit.apartment}/>квартира</Col>
                </Row>
                <Row>
                    <Col><h3>Комментарий</h3></Col>
                </Row>
                <Row>
                    <Col cols={'2'}>Комментарий к договору(не печатается на полисе)</Col>
                    <Col><Textarea id={'contractContractComment'} value={this.state.contractEdit.contractComment}/></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col cols={'auto'}>
                        <BtnGroup classAdd={'mb-2'}>
                            <Button onClick={() => this.clickSaveNewContract()} classAdd={'btn-sm'}>Сохранить</Button>
                            <Button onClick={() => this.clickToMainList()} classAdd={'btn-sm'}>К спсику договоров</Button>
                        </BtnGroup>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>;
    }
}
ReactDom.render(<App/>, document.getElementById('content-wrapper'));
