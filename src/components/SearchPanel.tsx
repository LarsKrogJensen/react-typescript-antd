import * as React from "react";
import {Table, Row, Col, Input, Icon, Alert} from "antd";
import {util} from "../util/util";
import * as lodash from "lodash";
import {api} from "../util/api";
import {SearchItem} from "../typings";
import Cancelable = _.Cancelable;
import {browserHistory} from "react-router";
import AccessToken = api.AccessToken;
import {AppStore} from "./AppStore";

const Search = Input.Search;


export interface SearchPanelProps
{
    initSearch?: string;
    appStore?: AppStore
}

interface SearchPanelState
{
    loading: boolean;
    searchText: string;
    table: SearchItem[];
}


class SearchTable extends Table<SearchItem>
{
}
class SearchColumn extends Table.Column<SearchItem>
{
}

type PartialState = Partial<SearchPanelState>;

let savedState: SearchPanelState = {
    loading: false,
    table: [],
    searchText: ""
}

export class SearchPanel extends React.Component<SearchPanelProps, SearchPanelState>
{
    private throttledSearch: Function & Cancelable = lodash.throttle(this.doSearch, 300, {
        leading: false,
        trailing: true
    });

    constructor(props: SearchPanelProps, context: any)
    {
        super(props, context);

        this.state = savedState;
         
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    }

    protected componentWillUnmount() {
        savedState = this.state;
    }

    private updateState(state: PartialState, callback?: () => any)
    {
        this.setState({...this.state, ...state}, callback)
    }

    private async doSearch(searchText: string)
    {
        let searchResults: SearchItem[] = await api.search(this.props.appStore.token.access_token, searchText);
        this.updateState({
                             table: searchResults,
                             loading: false
                         })
    }

    private async performSearch()
    {
        if (!util.isNullOrEmpty(this.state.searchText)) {
            this.throttledSearch.cancel();
            this.throttledSearch(this.state.searchText);
        } else {
            this.updateState({table: [], loading: false})
        }
    }

    private onSearchTextChanged(evt: any)
    {
        this.updateState({searchText: evt.target.value, loading: true}, () =>
        {
            this.performSearch();
        })
    }

    render()
    {
        let locale = {
            emptyText: <span><Icon type="frown-o"/>Nothing found</span>,
        };

        let token = this.props.appStore.token;
        if (token == null || token.access_token == null) {
            return (
                <Alert
                    message="Not authenticated"
                    description="This page requires a valid token, please sign in and try again"
                    type="error"
                    showIcon
                    closable
                    closeText="LOG IN"
                    onClose={() => { browserHistory.push({pathname: "/auth", query: {goto: "/search"}})}}
                />
            )
        }

        return <div>
            <Row style={{paddingBottom: 24}} gutter={10}>
                <Col span={24}>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        defaultValue={this.state.searchText}
                        onChange={this.onSearchTextChanged}
                        onSearch={(value: any) => console.log(value)}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <SearchTable dataSource={this.state.table}
                                 pagination={false}
                                 rowKey="id"
                                 loading={this.state.loading}
                                 locale={locale}
                                 bordered={false}
                                 size="small">
                        <SearchColumn title='Id'
                                      key="id"
                                      dataIndex='id'
                                      width={100}
                                      sorter={util.strCompare}/>
                        <SearchColumn title='Score'
                                      key="score"
                                      dataIndex='score'
                                      width={150}
                                      sorter={util.numCompare}/>
                        <SearchColumn title='Name'
                                      key="name"
                                      dataIndex='name'
                                      width={150}
                                      sorter={util.strCompare}/>
                        <SearchColumn title='Long Name'
                                      key="longName"
                                      dataIndex='longName'
                                      sorter={util.strCompare}/>
                    </SearchTable>
                </Col>
            </Row>
        </div>
    }
}
