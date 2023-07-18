import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import {
  Grid,
  Button,
  Container,
  Card,
  Box,
  Tabs,
  Tab,
  Divider,
  Stack,
  Tooltip,
  IconButton,
  TableContainer,
  TableBody,
  Table,
  TablePagination,
  FormControlLabel,
  Switch,
  TableFooter,
  TableRow,
  useTheme,
} from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { fetchDashboardLogs, fetchLogs } from 'src/store/action/logs.action';
import { statusLogCounts } from 'src/utils/formatProject';
import { AppAreaInstalled } from 'src/sections/@dashboard/general/app';
import { useRouter } from 'next/router';
import useTable, { getComparator } from 'src/hooks/useTable';
import useTabs from 'src/hooks/useTabs';
import Label from 'src/components/Label';
import { InvoiceTableRow, InvoiceTableToolbar } from 'src/sections/@dashboard/invoice/list';
import { TableNoData, TableSelectedActions } from 'src/components/table';
import Scrollbar from 'src/components/Scrollbar';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { ExportToCsv } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
BlogPosts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

interface Invoice {
  id: string;
  status: string;
  createAt: Date;
  project: string;
}

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'My Awesome CSV',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

const csvExporter = new ExportToCsv(options);
const handleDownloadPDF = (data: any) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Set up the table columns
  const columns = Object.keys(data[0]);

  // Set up the table rows
  const rows = data.map((item: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(item));

  // Add the table to the PDF document
  // @ts-ignore
  doc.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF using FileSaver.js
  doc.save('data.pdf');
};

export default function BlogPosts() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { logs, dashboardLogs, numberOfLogs } = useSelector((state: RootState) => state.logs);
  const projectData = dashboardLogs && statusLogCounts(dashboardLogs);
  const { themeStretch } = useSettings();
  useEffect(() => {
    dispatch(fetchLogs());
    dispatch(fetchDashboardLogs());
  }, []);

  const { push } = useRouter();

  const {
    dense,
    order,
    orderBy,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onChangeDense,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState<Invoice[]>([]);
  const [filterName, setFilterName] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setTableData(
      logs.map((i: { projectId: { name: string }; status: string; _id: number; date: Date }) => ({
        id: i._id,
        status: i.status,
        createAt: i.date,
        project: i.projectId.name,
      }))
    );
  }, [logs, dispatch]);
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.logs.view(id));
  };

  const handleViewRow = (id: string) => {
    push(PATH_DASHBOARD.logs.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.status === status).length;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: tableData.length },
    { value: 'paid', label: 'Paid', color: 'success', count: getLengthByStatus('paid') },
    { value: 'unpaid', label: 'Unpaid', color: 'warning', count: getLengthByStatus('unpaid') },
    { value: 'overdue', label: 'Overdue', color: 'error', count: getLengthByStatus('overdue') },
    { value: 'draft', label: 'Draft', color: 'default', count: getLengthByStatus('draft') },
  ] as const;

  const SERVICE_OPTIONS =
    logs && logs.length >= 1
      ? ['all', ...logs.map((i: { projectId: { name: string } }) => i.projectId.name)]
      : [];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    dispatch(fetchLogs(newPage + 1, rowsPerPage));
    console.log(newPage, 'new page', rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(fetchLogs(1, event.target.value as unknown as number));
  };

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="project"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'project', href: PATH_DASHBOARD.logs.root },
            { name: 'project list' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.logs.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Post
              </Button>
            </NextLink>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
            // @ts-ignore
            optionsService={SERVICE_OPTIONS && [...new Set(SERVICE_OPTIONS)]}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row): any => row)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Download as CSV">
                        <IconButton
                          color="primary"
                          onClick={() => csvExporter.generateCsv(selected)}
                        >
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary" onClick={() => handleDownloadPDF(selected)}>
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableBody>
                  {!isNotFound &&
                    tableData
                      .filter((item: Record<string, any>) =>
                        filterStatus !== 'all' ? item.status === filterStatus : true
                      )
                      .filter((item: Record<string, any>) =>
                        filterService !== 'all' ? item.project === filterService : true
                      )
                      .map((row) => (
                        <InvoiceTableRow
                          key={row.id}
                          // @ts-ignore
                          row={row}
                          // @ts-ignore
                          selected={selected.includes(row)}
                          // @ts-ignore
                          onSelectRow={() => onSelectRow(row)}
                          onViewRow={() => handleViewRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                        />
                      ))}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box
            sx={{
              Width: '100%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              '@media screen and (max-width: 670px)': {
                flexDirection: 'column',
              },
            }}
          >
            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5 }}
            />

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  colSpan={3}
                  count={numberOfLogs}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Box>
        </Card>

        <br />

        <Grid item xs={12} md={6} lg={8}>
          {dashboardLogs && dashboardLogs.length >= 1 && (
            <AppAreaInstalled
              title="Project log"
              chartLabels={
                dashboardLogs &&
                dashboardLogs.length >= 1 &&
                dashboardLogs?.map((i: { _id: Date }) => i._id)
              }
              chartData={[
                {
                  year: '2019',
                  data: [
                    {
                      name: 'paid',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[0]),
                    },
                    {
                      name: 'unpaid',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[1]),
                    },
                    {
                      name: 'overdue',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[2]),
                    },
                    {
                      name: 'draft',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[3]),
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    { name: 'paid', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                    { name: 'unpaid', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                  ],
                },
              ]}
            />
          )}
        </Grid>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterStartDate,
  filterEndDate,
}: {
  tableData: Invoice[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterService: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter((item: Record<string, any>) => {
      console.log(
        item.createAt,
        new Date().getTime(),
        filterStartDate.getTime(),
        filterEndDate.getTime()
      );
      return (
        new Date(item.createAt).getTime() >= filterStartDate.getTime() &&
        new Date(item.createAt).getTime() <= filterEndDate.getTime()
      );
    });
  }

  return tableData;
}
