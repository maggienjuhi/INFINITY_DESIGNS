              <div class="box box-success">
                <div class="box-header with-border">
                  <h3 class="box-title">Comments</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
		               <table  id="example1" class="table table-bordered table-striped">
					          <thead>
		                  <tr>
		                    <th style="width: 10px">ID</th>
										 		<th class="width: 10px">Your name</th>
										 		<th class="width: 10px">Email</th>
										 		<th class="width: 10px">Subject</th>
										 		<th class="width: 10px">Message body</th>
		                  </tr>
					          </thead>
					          <tbody>
											<?php
											if(isset($cards_contactform)){
												foreach($cards_contactform as $r):
													echo '<tr class="odd gradeX">';
													echo '<td class="width: 10px">'.$r->id.' </td>';
													echo '<td class="width: 10px">'.$r->yourname.' </td>';
													echo '<td class="width: 10px">'.$r->email.' </td>';
													echo '<td class="width: 10px">'.$r->subject.' </td>';
													echo '<td class="width: 10px">'.$r->messagebody.' </td>';
													echo '</tr>';
												endforeach;
										}
										?>
					          </tbody>
		                </table>
                </div><!-- /.box-body -->
              </div><!-- /.box -->
