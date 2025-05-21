import { describe, expect, test } from 'vitest';
import { runSiheom } from './siheom/siheom';
import { actions } from './siheom/action';
import { query } from './siheom/query';
import { given } from './siheom/given';
import Importer from '../importer';
import * as stories from './stories/Importer.stories';
import { assertions } from './siheom/assert';
import { expectedEmployees, inputCsvFile } from './fixtures';

describe('E2E Scenario', () => {
    test('can upload a csv file', async () => {
        let result: any = null;

        await runSiheom(
            given.viewport(1024, 768),
            given.render(
                <div className="hello-csv">
                    <Importer
                        {...stories.Basic.args}
                        onComplete={async (data) => {
                            result = data.parsedFile?.data;
                        }}
                    />
                </div>
            ),
            assertions.a11ySnapshot(query.group("Hello CSV"), 'hello-csv.snap'),

            // Upload a file
            actions.upload(query.label('Upload a file'), inputCsvFile),

            assertions.visible(query.button('Confirm')),
            assertions.a11ySnapshot(query.group("Hello CSV"), 'hello-csv-column-mapping.snap'),

            actions.click(query.button('Confirm')),

            assertions.tableSnapshot(query.table("Uploaded data"), 'uploaded-data-table.snap'),

            actions.click(query.button('Invalid (3)')),

            // Edit Error
            actions.dblclick(query.button(/row 1 Email/i)),
            actions.fill(query.textbox("edit row 1's Email"), 'test@test.com'),
            actions.tab(query.textbox("edit row 1's Email")),

            actions.dblclick(query.button(/row 1 Email/i)),
            actions.fill(query.textbox("edit row 1's Email"), 'test2@test.com'),
            actions.tab(query.textbox("edit row 1's Email")),

            actions.dblclick(query.button(/row 1 Zip Code 2108/i)),
            actions.fill(query.textbox("edit row 1's Zip Code"), '21089'),
            actions.tab(query.textbox("edit row 1's Zip Code")),

            // Approve
            assertions.visible(query.button('Valid (20)')),
            actions.click(query.button('Upload')),

            actions.click(query.button('Continue'))
        );

        expect(result).toStrictEqual(expectedEmployees);
    });
});
