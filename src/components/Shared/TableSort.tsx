import { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons';
import { StudentEnquiryModal } from './ViewEnquiryModal';
import {
  Enquiry,
  RowData,
  TableHeaderProps,
  TableSortProps,
} from '@/types/global';
import { useDisclosure } from '@chakra-ui/react';
import { StatusBadge } from './StatusBadge';
import moment from 'moment';
import { useStylesTableSort } from '@/styles/Shared.TableSort';

/**
 * UI Function component for displyaing the table header
 * @param {object} props Component props
 * @param {} placeholder
 * @param {children} props.children status of the modal
 * @param {boolean} props.reversed state for whether the table is reversed
 * @param {boolean} props.sorted state for whether the table is sorted
 * @param {Function} props.onSort function for handling the on sort method
 * @returns {JSX.Element} JSX Element
 */
const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  reversed,
  sorted,
  onSort,
}): JSX.Element => {
  const { classes } = useStylesTableSort();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
};

/**
 * Filter data based on search keyword
 * @param {RowData[]} data - enquiry data
 * @param {search} search - search word from input field
 * @returns {Enquiry[]} list of enquiries matching the search keyword
 */
const filterData = (data: RowData[], search: string): Enquiry[] => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return keys(data[0]).some((key) => {
      if (item[key] != null && key != `user`) {
        return item[key].toLowerCase().includes(query);
      }
    });
  });
};

/**
 * Sort data based on search keyword
 * @param {RowData[]} data - enquiry data
 * @param {search} payload - keys of data, search keyword
 * @returns {Enquiry[]} list of enquiries matching the search keyword
 */
const sortData = (
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
): Enquiry[] => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        if (sortBy != `user`) {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      }

      if (sortBy != `user`) {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    }),
    payload.search,
  );
};

/**
 * UI Function component for showing enquiries in a table format
 * @param {object} props Component props
 * @param {} placeholder
 * @param {Enquiry[]} props.data - all enquiries fetched from the db
 * @param {search} props.tableType - type of enquiry table type
 * @param {search} props.view - represent the current user view
 * @returns {JSX.Element} JSX Element
 */
export const TableSort: React.FC<TableSortProps> = ({
  data,
  tableType,
  view,
}): JSX.Element => {
  const [search, setSearch] = useState(``);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry>();

  /** update sorted data after invalidating fetchEnquiries */
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  /**
   * Sets the sorting
   * @param field - key of each row data
   */
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  /**
   * Hanlde the search change input on the table
   * @param event - HTML event
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    );
  };

  const rows = sortedData.map((row) => {
    return (
      <>
        <tr
          key={row.id}
          onClick={() => {
            onOpen();
            setSelectedEnquiry(row);
          }}
          style={{
            cursor: `pointer`,
          }}
        >
          <td>{row.id}</td>
          <td>{row.courseCode}</td>
          {tableType === `assignment` ? <td>{row.assignmentNo}</td> : <></>}
          <td>{moment(row.createdAt).format(`lll`)}</td>
          <td>{moment(row.updatedAt).format(`lll`)}</td>
          <td>
            <StatusBadge enquiryStatus={row.status} size="md" />
          </td>
        </tr>
      </>
    );
  });

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: `fixed`, minWidth: 700 }}
        highlightOnHover
      >
        <thead>
          <tr>
            <TableHeader
              sorted={sortBy === `id`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`id`)}
            >
              ID
            </TableHeader>
            <TableHeader
              sorted={sortBy === `courseCode`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`courseCode`)}
            >
              Course
            </TableHeader>
            {tableType === `test` ? (
              <></>
            ) : (
              <TableHeader
                sorted={sortBy === `assignmentNo`}
                reversed={reverseSortDirection}
                onSort={() => setSorting(`assignmentNo`)}
              >
                Assignment No
              </TableHeader>
            )}

            <TableHeader
              sorted={sortBy === `createdAt`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`createdAt`)}
            >
              Date Submitted
            </TableHeader>

            <TableHeader
              sorted={sortBy === `updatedAt`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`updatedAt`)}
            >
              Date Updated
            </TableHeader>

            <TableHeader
              sorted={sortBy === `status`}
              reversed={reverseSortDirection}
              onSort={() => setSorting(`status`)}
            >
              Status
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={6}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {selectedEnquiry != null ? (
        <StudentEnquiryModal
          enquiry={selectedEnquiry}
          isOpen={isOpen}
          onClose={onClose}
          view={view}
        />
      ) : (
        <></>
      )}
    </ScrollArea>
  );
};
